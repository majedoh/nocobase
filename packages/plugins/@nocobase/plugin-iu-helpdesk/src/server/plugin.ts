/**
 * IU Helpdesk Plugin - Server Plugin Class
 *
 * Features:
 * - SLA tracking: auto-escalate on timeout
 * - Auto-assignment by category
 * - Resolution time calculation
 */
import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUHelpdeskServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: { 'name.$notIn': ['supportTickets', 'ticketReplies', 'knowledgeBase'] },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['supportTickets:*', 'ticketReplies:*', 'knowledgeBase:*'],
    });

    this.app.acl.allow('supportTickets', ['create', 'list', 'get'], 'loggedIn');
    this.app.acl.allow('ticketReplies', ['create', 'list', 'get'], 'loggedIn');
    this.app.acl.allow('knowledgeBase', ['list', 'get'], 'loggedIn');

    // Auto-assign team based on category
    this.app.db.on('supportTickets.beforeCreate', async (model: any) => {
      const category = model.get('category');
      const categoryToTeam: Record<string, string> = {
        it_hardware: 'it_support',
        it_software: 'it_support',
        it_network: 'network',
        it_email: 'systems',
        it_sis: 'registrar',
        it_lms: 'systems',
        access_request: 'systems',
        complaint: 'student_affairs',
        suggestion: 'student_affairs',
      };
      if (category && categoryToTeam[category] && !model.get('assignedTeam')) {
        model.set('assignedTeam', categoryToTeam[category]);
      }
    });

    // Auto-set resolvedAt timestamp when status changes to resolved
    this.app.db.on('supportTickets.beforeUpdate', async (model: any) => {
      const newStatus = model.get('status');
      const prevStatus = model.previous('status');
      if (newStatus === 'resolved' && prevStatus !== 'resolved') {
        model.set('resolvedAt', new Date());
      }
    });

    // Log ticket lifecycle for SLA reporting
    this.app.db.on('supportTickets.afterUpdate', async (model: any) => {
      const prevStatus = model.previous('status');
      const newStatus = model.get('status');
      if (prevStatus !== newStatus) {
        this.app.logger.info(
          `[iu-helpdesk] Ticket ${model.get('ticketNumber')}: ${prevStatus} → ${newStatus} | Priority: ${model.get('priority')}`
        );
      }
    });

    // Create a status_change reply on ticket status transitions
    this.app.db.on('supportTickets.afterUpdate', async (model: any, options: any) => {
      const prevStatus = model.previous('status');
      const newStatus = model.get('status');
      if (prevStatus && prevStatus !== newStatus) {
        const replyRepo = this.app.db.getRepository('ticketReplies');
        await replyRepo.create({
          values: {
            ticketId: model.get('id'),
            content: `الحالة تغيرت من "${prevStatus}" إلى "${newStatus}"`,
            isInternal: true,
            replyType: 'status_change',
          },
          transaction: options?.transaction,
        });
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('supportTickets');
      await collectionRepo.db2cm('ticketReplies');
      await collectionRepo.db2cm('knowledgeBase');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUHelpdeskServer;
