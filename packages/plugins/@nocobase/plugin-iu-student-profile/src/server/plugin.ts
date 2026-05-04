/**
 * IU Student Profile Plugin - Server Plugin Class
 * Islamic University of Madinah - Student 360° CRM
 *
 * Registers student collections, ACL rules, and lifecycle hooks.
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUStudentProfileServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    // Protect student collections from accidental deletion via the collection manager
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['students', 'studentNotes', 'studentFlags'],
      },
    }));
  }

  async load() {
    // Register ACL snippet: full CRUD for student management roles
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        'students:*',
        'studentNotes:*',
        'studentFlags:*',
      ],
    });

    // Allow any logged-in user to list/get students (filtered by role-based data scope)
    this.app.acl.allow('students', ['list', 'get'], 'loggedIn');

    // Auto-set GPA-based flags when student record is updated
    this.app.db.on('students.afterUpdate', async (model: any, options: any) => {
      const gpa = model.get('gpa');
      const studentId = model.get('id');
      const status = model.get('status');

      // Only process active students
      if (status !== 'active' || gpa === null || gpa === undefined) {
        return;
      }

      const flagRepo = this.app.db.getRepository('studentFlags');

      // Check if an active probation flag already exists
      const existingProbation = await flagRepo.findOne({
        filter: {
          studentId,
          type: 'probation',
          active: true,
        },
        transaction: options?.transaction,
      });

      // GPA < 2.0 → auto-create probation flag if not already present
      if (gpa < 2.0 && !existingProbation) {
        await flagRepo.create({
          values: {
            studentId,
            type: 'probation',
            reason: `المعدل التراكمي (${gpa}) أقل من الحد الأدنى المطلوب (2.0)`,
            active: true,
          },
          transaction: options?.transaction,
        });
        this.app.logger.info(`[iu-student-profile] Auto-created probation flag for student ${studentId} (GPA: ${gpa})`);
      }

      // GPA >= 2.0 → auto-resolve existing probation flag
      if (gpa >= 2.0 && existingProbation) {
        await flagRepo.update({
          filter: { id: existingProbation.get('id') },
          values: {
            active: false,
            resolvedAt: new Date(),
          },
          transaction: options?.transaction,
        });
        this.app.logger.info(`[iu-student-profile] Auto-resolved probation flag for student ${studentId} (GPA: ${gpa})`);
      }
    });
  }

  async install(options?: InstallOptions) {
    // Register collections in the collection manager so they appear in the admin UI
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('students');
      await collectionRepo.db2cm('studentNotes');
      await collectionRepo.db2cm('studentFlags');
    }
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginIUStudentProfileServer;
