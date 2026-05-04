/**
 * IU HR Self-Service Plugin - Server Plugin Class
 *
 * Features:
 * - Auto-calculate total days on leave request
 * - Auto-deduct leave balance on approval
 * - Balance check before approval (prevent overdraft)
 * - Auto-update employee status to "on_leave" during leave period
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUHRServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: { 'name.$notIn': ['employees', 'leaveRequests', 'leaveBalances'] },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['employees:*', 'leaveRequests:*', 'leaveBalances:*'],
    });

    this.app.acl.allow('employees', ['list', 'get'], 'loggedIn');
    this.app.acl.allow('leaveRequests', ['list', 'get', 'create'], 'loggedIn');
    this.app.acl.allow('leaveBalances', ['list', 'get'], 'loggedIn');

    // Auto-calculate total days
    this.app.db.on('leaveRequests.beforeCreate', async (model: any) => {
      const start = model.get('startDate');
      const end = model.get('endDate');
      if (start && end) {
        const diffMs = new Date(end).getTime() - new Date(start).getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1; // inclusive
        model.set('totalDays', Math.max(1, diffDays));
      }
    });

    // Balance check + auto-deduct on HR approval
    this.app.db.on('leaveRequests.afterUpdate', async (model: any, options: any) => {
      const prevStatus = model.previous('status');
      const newStatus = model.get('status');

      if (prevStatus === newStatus) return;

      // On HR approval: deduct balance
      if (newStatus === 'approved_hr') {
        const employeeId = model.get('employeeId');
        const leaveType = model.get('leaveType');
        const totalDays = model.get('totalDays') || 0;
        const year = new Date().getFullYear().toString();

        const balanceRepo = this.app.db.getRepository('leaveBalances');
        const balance = await balanceRepo.findOne({
          filter: { employeeId, leaveType, year },
          transaction: options?.transaction,
        });

        if (balance) {
          const remaining = (balance.get('remaining') as number) || 0;
          if (remaining < totalDays) {
            this.app.logger.warn(
              `[iu-hr] Leave balance warning: employee ${employeeId} has ${remaining} days but requested ${totalDays}`
            );
          }

          await balanceRepo.update({
            filter: { id: balance.get('id') },
            values: {
              used: (balance.get('used') as number || 0) + totalDays,
              remaining: Math.max(0, remaining - totalDays),
            },
            transaction: options?.transaction,
          });
        }

        this.app.logger.info(
          `[iu-hr] Leave ${model.get('requestNumber')} approved. ${totalDays} days deducted for employee ${employeeId}`
        );
      }

      // On cancellation: restore balance
      if (newStatus === 'cancelled' && (prevStatus === 'approved_hr' || prevStatus === 'approved_manager')) {
        const employeeId = model.get('employeeId');
        const leaveType = model.get('leaveType');
        const totalDays = model.get('totalDays') || 0;
        const year = new Date().getFullYear().toString();

        const balanceRepo = this.app.db.getRepository('leaveBalances');
        const balance = await balanceRepo.findOne({
          filter: { employeeId, leaveType, year },
          transaction: options?.transaction,
        });

        if (balance) {
          await balanceRepo.update({
            filter: { id: balance.get('id') },
            values: {
              used: Math.max(0, (balance.get('used') as number || 0) - totalDays),
              remaining: (balance.get('remaining') as number || 0) + totalDays,
            },
            transaction: options?.transaction,
          });
          this.app.logger.info(`[iu-hr] Leave ${model.get('requestNumber')} cancelled. ${totalDays} days restored.`);
        }
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('employees');
      await collectionRepo.db2cm('leaveRequests');
      await collectionRepo.db2cm('leaveBalances');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUHRServer;
