/**
 * IU Admissions Pipeline Plugin - Server Plugin Class
 *
 * Pipeline logic:
 * - Auto-assigns officers by nationality group
 * - Auto-validates required documents on stage transition
 * - Creates student record when applicant reaches "enrolled" stage
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUAdmissionsServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['applicants', 'applicantDocuments', 'admissionDecisions'],
      },
    }));
  }

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        'applicants:*',
        'applicantDocuments:*',
        'admissionDecisions:*',
      ],
    });

    // Public form submissions create applicant records
    this.app.acl.allow('applicants', ['create'], 'public');
    this.app.acl.allow('applicants', ['list', 'get'], 'loggedIn');

    // Auto-create decision record on pipeline stage change
    this.app.db.on('applicants.afterUpdate', async (model: any, options: any) => {
      const previousStage = model.previous('pipelineStage');
      const currentStage = model.get('pipelineStage');

      if (!previousStage || previousStage === currentStage) return;

      const decisionRepo = this.app.db.getRepository('admissionDecisions');
      await decisionRepo.create({
        values: {
          applicantId: model.get('id'),
          stage: currentStage,
          decision: currentStage === 'rejected' ? 'rejected' : 'approved',
          reason: `Stage transition: ${previousStage} → ${currentStage}`,
        },
        transaction: options?.transaction,
      });

      this.app.logger.info(
        `[iu-admissions] Applicant ${model.get('applicationNumber')}: ${previousStage} → ${currentStage}`
      );

      // When enrolled → auto-create student record if student plugin exists
      if (currentStage === 'enrolled') {
        const studentRepo = this.app.db.getRepository('students');
        if (studentRepo) {
          const existingStudent = await studentRepo.findOne({
            filter: { universityId: model.get('applicationNumber') },
            transaction: options?.transaction,
          });

          if (!existingStudent) {
            await studentRepo.create({
              values: {
                universityId: model.get('applicationNumber'),
                nameAr: model.get('nameAr'),
                nameEn: model.get('nameEn'),
                nationality: model.get('nationality'),
                email: model.get('email'),
                phone: model.get('phone'),
                program: model.get('desiredProgram'),
                college: model.get('desiredCollege'),
                scholarshipType: model.get('scholarshipRequested') || 'none',
                status: 'active',
                enrollmentDate: new Date(),
              },
              transaction: options?.transaction,
            });
            this.app.logger.info(
              `[iu-admissions] Auto-created student record for ${model.get('nameAr')}`
            );
          }
        }
      }
    });

    // Validate documents completeness before committee review
    this.app.db.on('applicants.beforeUpdate', async (model: any, options: any) => {
      const currentStage = model.get('pipelineStage');
      const previousStage = model.previous('pipelineStage');

      if (currentStage === 'committee_review' && previousStage === 'document_review') {
        const docRepo = this.app.db.getRepository('applicantDocuments');
        const pendingDocs = await docRepo.count({
          filter: {
            applicantId: model.get('id'),
            status: { $in: ['pending', 'missing'] },
          },
          transaction: options?.transaction,
        });

        if (pendingDocs > 0) {
          throw new Error(
            `Cannot advance to committee review: ${pendingDocs} document(s) still pending/missing`
          );
        }
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('applicants');
      await collectionRepo.db2cm('applicantDocuments');
      await collectionRepo.db2cm('admissionDecisions');
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUAdmissionsServer;
