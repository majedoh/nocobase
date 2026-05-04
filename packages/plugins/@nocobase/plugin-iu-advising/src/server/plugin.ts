/**
 * IU Academic Advising Plugin - Server Plugin Class
 *
 * Features:
 * - Slot booking with conflict detection
 * - Auto early-alert creation on low GPA
 * - Session documentation with follow-up tracking
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUAdvisingServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['advisingSlots', 'advisingSessions', 'earlyAlerts'],
      },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        'advisingSlots:*',
        'advisingSessions:*',
        'earlyAlerts:*',
      ],
    });

    this.app.acl.allow('advisingSlots', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('advisingSessions', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('earlyAlerts', ['list', 'get'], 'loggedIn');

    // Prevent double-booking: check for conflicts before slot booking
    this.app.db.on('advisingSlots.beforeUpdate', async (model: any, options: any) => {
      const isBeingBooked = model.get('isBooked') === true && model.previous('isBooked') === false;

      if (isBeingBooked) {
        const slotRepo = this.app.db.getRepository('advisingSlots');
        const advisorId = model.get('advisorId');
        const date = model.get('date');
        const timeStart = model.get('timeStart');
        const timeEnd = model.get('timeEnd');

        const conflicting = await slotRepo.count({
          filter: {
            advisorId,
            date,
            isBooked: true,
            id: { $ne: model.get('id') },
            $or: [
              { timeStart: { $lt: timeEnd }, timeEnd: { $gt: timeStart } },
            ],
          },
          transaction: options?.transaction,
        });

        if (conflicting > 0) {
          throw new Error('This time slot conflicts with an existing booking');
        }
      }
    });

    // Auto-create early alert when advising session outcome is "referred" or type is "probation"
    this.app.db.on('advisingSessions.afterCreate', async (model: any, options: any) => {
      const sessionType = model.get('sessionType');
      const outcome = model.get('outcome');

      if (sessionType === 'probation' || outcome === 'referred') {
        const alertRepo = this.app.db.getRepository('earlyAlerts');
        const existingAlert = await alertRepo.findOne({
          filter: {
            studentId: model.get('studentId'),
            status: { $in: ['open', 'in_progress'] },
          },
          transaction: options?.transaction,
        });

        if (!existingAlert) {
          await alertRepo.create({
            values: {
              studentId: model.get('studentId'),
              triggerReason: sessionType === 'probation' ? 'low_gpa' : 'manual',
              severity: sessionType === 'probation' ? 'high' : 'medium',
              description: `Generated from advising session. Notes: ${model.get('notes') || 'N/A'}`,
              status: 'open',
            },
            transaction: options?.transaction,
          });
          this.app.logger.info(
            `[iu-advising] Auto-created early alert for student ${model.get('studentId')}`
          );
        }
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('advisingSlots');
      await collectionRepo.db2cm('advisingSessions');
      await collectionRepo.db2cm('earlyAlerts');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUAdvisingServer;
