/**
 * IU Financial Aid Plugin - Server Plugin Class
 *
 * Features:
 * - Disbursement eligibility checks (active student + no financial hold)
 * - Auto-hold stipend when student has active "hold" flag
 * - Audit logging for all financial transactions
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUFinancialAidServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['stipendDisbursements', 'financialAidRequests'],
      },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['stipendDisbursements:*', 'financialAidRequests:*'],
    });

    this.app.acl.allow('financialAidRequests', ['create', 'list', 'get'], 'loggedIn');
    this.app.acl.allow('stipendDisbursements', ['list', 'get'], 'loggedIn');

    // Eligibility check before disbursement approval
    this.app.db.on('stipendDisbursements.beforeUpdate', async (model: any, options: any) => {
      const newStatus = model.get('status');
      const prevStatus = model.previous('status');

      // Only check when transitioning to "approved" or "disbursed"
      if ((newStatus === 'approved' || newStatus === 'disbursed') && prevStatus !== newStatus) {
        const studentId = model.get('studentId');

        // Check 1: Student must be active
        const studentRepo = this.app.db.getRepository('students');
        if (studentRepo) {
          const student = await studentRepo.findOne({
            filter: { id: studentId },
            transaction: options?.transaction,
          });

          if (student && student.get('status') !== 'active') {
            throw new Error(
              `Cannot disburse stipend: Student status is "${student.get('status')}" (must be active)`
            );
          }
        }

        // Check 2: No active "hold" flags
        const flagRepo = this.app.db.getRepository('studentFlags');
        if (flagRepo) {
          const activeHolds = await flagRepo.count({
            filter: {
              studentId,
              type: 'hold',
              active: true,
            },
            transaction: options?.transaction,
          });

          if (activeHolds > 0) {
            model.set('status', 'on_hold');
            model.set('holdReason', 'Active hold flag on student record');
            this.app.logger.warn(
              `[iu-financial-aid] Stipend ${model.get('id')} auto-held: student ${studentId} has active hold`
            );
            return; // Don't throw — just redirect to on_hold
          }
        }
      }
    });

    // Log financial transactions
    this.app.db.on('stipendDisbursements.afterUpdate', async (model: any) => {
      const prevStatus = model.previous('status');
      const newStatus = model.get('status');

      if (prevStatus !== newStatus) {
        this.app.logger.info(
          `[iu-financial-aid] Disbursement ${model.get('disbursementNumber')}: ${prevStatus} → ${newStatus} | Amount: ${model.get('amount')} SAR`
        );
      }
    });

    // Auto-set approved amount = requested amount if not specified
    this.app.db.on('financialAidRequests.beforeUpdate', async (model: any) => {
      if (model.get('status') === 'approved' && !model.get('approvedAmount')) {
        model.set('approvedAmount', model.get('requestedAmount'));
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('stipendDisbursements');
      await collectionRepo.db2cm('financialAidRequests');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUFinancialAidServer;
