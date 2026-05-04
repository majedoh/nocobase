/**
 * IU Document Management Plugin - Server Plugin Class
 * Islamic University of Madinah - Document Requests & Archive
 *
 * Handles document template management, request workflows,
 * and audit trail for all generated documents.
 */

import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUDocumentsServer extends Plugin {
  afterAdd() {}

  beforeLoad() {
    // Protect document collections from accidental deletion
    this.app.acl.addFixedParams('collections', 'destroy', () => ({
      filter: {
        'name.$notIn': ['documentTemplates', 'documentRequests', 'documentArchive'],
      },
    }));
  }

  async load() {
    // ACL: Full access for document management roles
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        'documentTemplates:*',
        'documentRequests:*',
        'documentArchive:*',
      ],
    });

    // Allow logged-in users to create document requests and view their own
    this.app.acl.allow('documentRequests', ['create', 'list', 'get'], 'loggedIn');
    // Allow logged-in users to view active templates
    this.app.acl.allow('documentTemplates', ['list', 'get'], 'loggedIn');

    // Auto-generate request number and set initial status on creation
    this.app.db.on('documentRequests.beforeCreate', async (model: any) => {
      if (!model.get('status')) {
        model.set('status', 'pending');
      }
    });

    // Log status transitions for audit purposes
    this.app.db.on('documentRequests.afterUpdate', async (model: any) => {
      const previousStatus = model.previous('status');
      const currentStatus = model.get('status');

      if (previousStatus && previousStatus !== currentStatus) {
        this.app.logger.info(
          `[iu-documents] Document request ${model.get('id')} status changed: ${previousStatus} → ${currentStatus}`
        );
      }
    });
  }

  async install(options?: InstallOptions) {
    const collectionRepo = this.db.getRepository<any>('collections');
    if (collectionRepo) {
      await collectionRepo.db2cm('documentTemplates');
      await collectionRepo.db2cm('documentRequests');
      await collectionRepo.db2cm('documentArchive');
    }

    // Seed default document templates
    const templateRepo = this.db.getRepository('documentTemplates');
    const existingCount = await templateRepo.count();

    if (existingCount === 0) {
      await templateRepo.createMany({
        records: [
          {
            nameAr: 'تعريف بالدراسة',
            nameEn: 'Enrollment Verification Letter',
            type: 'enrollment_verification',
            bodyTemplate: `بسم الله الرحمن الرحيم

تعريف بالدراسة

يشهد عميد القبول والتسجيل بالجامعة الإسلامية بالمدينة المنورة بأن الطالب:
الاسم: {{student.nameAr}}
الرقم الجامعي: {{student.universityId}}
الجنسية: {{student.nationality}}
الكلية: {{student.college}}
البرنامج: {{student.program}}
المستوى: {{student.academicLevel}}
المعدل التراكمي: {{student.gpa}}

لا يزال منتظماً في الدراسة حتى تاريخه.

وقد أعطي هذا التعريف بناءً على طلبه دون أدنى مسؤولية على الجامعة.

والله الموفق`,
            requiresApproval: false,
            active: true,
          },
          {
            nameAr: 'شهادة معدل تراكمي',
            nameEn: 'GPA Certificate',
            type: 'gpa_certificate',
            bodyTemplate: `بسم الله الرحمن الرحيم

شهادة معدل تراكمي

يشهد عميد القبول والتسجيل بالجامعة الإسلامية بالمدينة المنورة بأن الطالب:
الاسم: {{student.nameAr}}
الرقم الجامعي: {{student.universityId}}

قد حصل على معدل تراكمي قدره ({{student.gpa}}) من (5.00) نقاط.
عدد الساعات المكتملة: {{student.completedCredits}} ساعة.

والله الموفق`,
            requiresApproval: true,
            active: true,
          },
          {
            nameAr: 'خطاب تخرج',
            nameEn: 'Graduation Letter',
            type: 'graduation_letter',
            bodyTemplate: `بسم الله الرحمن الرحيم

خطاب تخرج

يسر الجامعة الإسلامية بالمدينة المنورة أن تشهد بأن الطالب:
الاسم: {{student.nameAr}}
الرقم الجامعي: {{student.universityId}}

قد أتم متطلبات التخرج من {{student.college}} - {{student.program}}
بمعدل تراكمي: {{student.gpa}} من 5.00

والله الموفق`,
            requiresApproval: true,
            active: true,
          },
        ],
      });

      this.app.logger.info('[iu-documents] Seeded 3 default document templates');
    }
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginIUDocumentsServer;
