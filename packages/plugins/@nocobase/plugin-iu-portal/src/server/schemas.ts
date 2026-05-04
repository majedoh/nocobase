/**
 * IU Portal — UI Schema Definitions
 *
 * These schemas define the complete admin panel layout:
 * sidebar navigation, page structures, and default table block configurations.
 *
 * NocoBase stores UI configuration as JSON schemas in the `uiSchemas` table.
 * This file provides the seed schemas that get inserted on plugin install.
 */

import { uid } from '@nocobase/utils';

// ─── Helper: Generate a table block schema for a given collection ───

function tableBlockSchema(collection: string, columns: string[], title?: string): Record<string, any> {
  const blockId = uid();
  const tableId = uid();
  const columnSchemas: Record<string, any> = {};

  columns.forEach((col, i) => {
    columnSchemas[uid()] = {
      'x-uid': uid(),
      'x-component': 'TableV2.Column',
      'x-component-props': { width: null },
      'x-decorator': 'TableV2.Column.Decorator',
      properties: {
        [col]: {
          'x-collection-field': `${collection}.${col}`,
          'x-component': 'CollectionField',
          'x-read-pretty': true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {},
          'x-uid': uid(),
        },
      },
    };
  });

  return {
    'x-uid': blockId,
    type: 'void',
    'x-decorator': 'TableBlockProvider',
    'x-acl-action': `${collection}:list`,
    'x-decorator-props': {
      collection,
      dataSource: 'main',
      action: 'list',
      params: { pageSize: 20 },
      rowKey: 'id',
      showIndex: true,
      dragSort: false,
    },
    'x-component': 'CardItem',
    'x-component-props': { title: title || '' },
    properties: {
      actions: {
        type: 'void',
        'x-component': 'ActionBar',
        'x-component-props': { style: { marginBottom: 16 } },
        properties: {
          filter: { 'x-uid': uid(), type: 'void', title: '{{t("Filter")}}', 'x-action': 'filter', 'x-component': 'Filter.Action', 'x-component-props': { icon: 'FilterOutlined', useProps: '{{ useFilterActionProps }}' } },
          refresh: { 'x-uid': uid(), type: 'void', title: '{{t("Refresh")}}', 'x-action': 'refresh', 'x-component': 'Action', 'x-component-props': { icon: 'ReloadOutlined', useProps: '{{ useRefreshActionProps }}' } },
          create: { 'x-uid': uid(), type: 'void', title: '{{t("Add new")}}', 'x-action': 'create', 'x-component': 'Action', 'x-component-props': { type: 'primary', icon: 'PlusOutlined', openMode: 'drawer' } },
        },
      },
      [tableId]: {
        type: 'array',
        'x-component': 'TableV2',
        'x-component-props': { rowKey: 'id', rowSelection: { type: 'checkbox' } },
        properties: columnSchemas,
      },
    },
  };
}

// ─── Helper: Generate a page schema with one or more blocks ───

function pageSchema(pageTitle: string, blocks: Record<string, any>[]): Record<string, any> {
  const pageId = uid();
  const gridId = uid();
  const rows: Record<string, any> = {};

  blocks.forEach((block, i) => {
    const rowId = uid();
    const colId = uid();
    rows[rowId] = {
      'x-uid': rowId,
      type: 'void',
      'x-component': 'Grid.Row',
      properties: {
        [colId]: {
          'x-uid': colId,
          type: 'void',
          'x-component': 'Grid.Col',
          properties: { [uid()]: block },
        },
      },
    };
  });

  return {
    'x-uid': pageId,
    type: 'void',
    'x-component': 'Page',
    'x-component-props': {},
    properties: {
      [gridId]: {
        'x-uid': gridId,
        type: 'void',
        'x-component': 'Grid',
        'x-initializer': 'page:addBlock',
        properties: rows,
      },
    },
  };
}

// ─── Menu Structure ───

export function getMenuSchemas(): Record<string, any> {
  return {
    // ── Group 1: Student Affairs ──
    'iu-students': {
      'x-uid': uid(), type: 'void', title: 'شؤون الطلاب',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'TeamOutlined' },
      properties: {
        'iu-students-list': {
          'x-uid': uid(), type: 'void', title: 'الطلاب',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'UserOutlined' },
        },
        'iu-admissions': {
          'x-uid': uid(), type: 'void', title: 'طلبات القبول',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'SolutionOutlined' },
        },
        'iu-advising': {
          'x-uid': uid(), type: 'void', title: 'الإرشاد الأكاديمي',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'ScheduleOutlined' },
        },
        'iu-housing': {
          'x-uid': uid(), type: 'void', title: 'السكن الجامعي',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'HomeOutlined' },
        },
        'iu-financial-aid': {
          'x-uid': uid(), type: 'void', title: 'المساعدات المالية',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'DollarOutlined' },
        },
      },
    },
    // ── Group 2: Documents ──
    'iu-documents': {
      'x-uid': uid(), type: 'void', title: 'الوثائق',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'FileTextOutlined' },
      properties: {
        'iu-doc-requests': {
          'x-uid': uid(), type: 'void', title: 'طلبات الوثائق',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'FileSearchOutlined' },
        },
        'iu-doc-templates': {
          'x-uid': uid(), type: 'void', title: 'قوالب الوثائق',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'FileProtectOutlined' },
        },
      },
    },
    // ── Group 3: Employee Affairs ──
    'iu-employees': {
      'x-uid': uid(), type: 'void', title: 'شؤون الموظفين',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'IdcardOutlined' },
      properties: {
        'iu-emp-list': {
          'x-uid': uid(), type: 'void', title: 'الموظفون',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'UserOutlined' },
        },
        'iu-leave-requests': {
          'x-uid': uid(), type: 'void', title: 'طلبات الإجازة',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'CalendarOutlined' },
        },
        'iu-leave-balances': {
          'x-uid': uid(), type: 'void', title: 'أرصدة الإجازات',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'FieldTimeOutlined' },
        },
      },
    },
    // ── Group 4: Helpdesk ──
    'iu-helpdesk': {
      'x-uid': uid(), type: 'void', title: 'مكتب المساعدة',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'CustomerServiceOutlined' },
      properties: {
        'iu-tickets': {
          'x-uid': uid(), type: 'void', title: 'تذاكر الدعم',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'TagsOutlined' },
        },
        'iu-knowledge-base': {
          'x-uid': uid(), type: 'void', title: 'قاعدة المعرفة',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'ReadOutlined' },
        },
      },
    },
    // ── Group 5: Facilities ──
    'iu-facilities': {
      'x-uid': uid(), type: 'void', title: 'المرافق',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'BankOutlined' },
      properties: {
        'iu-venues': {
          'x-uid': uid(), type: 'void', title: 'القاعات والمرافق',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'AppstoreOutlined' },
        },
        'iu-bookings': {
          'x-uid': uid(), type: 'void', title: 'حجوزات المرافق',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'CalendarOutlined' },
        },
        'iu-fleet': {
          'x-uid': uid(), type: 'void', title: 'أسطول المركبات',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'CarOutlined' },
        },
      },
    },
    // ── Group 6: Academic Quality ──
    'iu-academic-quality': {
      'x-uid': uid(), type: 'void', title: 'الجودة الأكاديمية',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'AuditOutlined' },
      properties: {
        'iu-course-eval': {
          'x-uid': uid(), type: 'void', title: 'تقييم المقررات',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'StarOutlined' },
        },
        'iu-research': {
          'x-uid': uid(), type: 'void', title: 'المنح البحثية',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'ExperimentOutlined' },
        },
        'iu-qa': {
          'x-uid': uid(), type: 'void', title: 'ضمان الجودة',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'SafetyOutlined' },
        },
      },
    },
    // ── Group 7: Engagement ──
    'iu-engagement': {
      'x-uid': uid(), type: 'void', title: 'التواصل',
      'x-component': 'Menu.SubMenu', 'x-component-props': { icon: 'GlobalOutlined' },
      properties: {
        'iu-alumni': {
          'x-uid': uid(), type: 'void', title: 'الخريجون',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'TrophyOutlined' },
        },
        'iu-career': {
          'x-uid': uid(), type: 'void', title: 'الخدمات المهنية',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'RocketOutlined' },
        },
        'iu-events': {
          'x-uid': uid(), type: 'void', title: 'الفعاليات',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'NotificationOutlined' },
        },
        'iu-library': {
          'x-uid': uid(), type: 'void', title: 'المكتبة',
          'x-component': 'Menu.Item', 'x-component-props': { icon: 'BookOutlined' },
        },
      },
    },
  };
}

// ─── Page Schemas (Table Blocks per Page) ───

export function getPageSchemas(): Record<string, Record<string, any>> {
  return {
    'iu-students-list': pageSchema('الطلاب', [
      tableBlockSchema('students', ['universityId', 'nameAr', 'college', 'program', 'gpa', 'status', 'scholarshipType'], 'سجل الطلاب'),
    ]),
    'iu-admissions': pageSchema('طلبات القبول', [
      tableBlockSchema('applicants', ['applicationNumber', 'nameAr', 'nationality', 'desiredCollege', 'pipelineStage', 'committeeScore', 'visaStatus'], 'خط القبول'),
    ]),
    'iu-advising': pageSchema('الإرشاد الأكاديمي', [
      tableBlockSchema('advisingSessions', ['sessionDate', 'sessionType', 'outcome', 'actionItems'], 'جلسات الإرشاد'),
    ]),
    'iu-housing': pageSchema('السكن الجامعي', [
      tableBlockSchema('buildings', ['nameAr', 'gender', 'totalRooms', 'floors', 'status'], 'المباني'),
    ]),
    'iu-financial-aid': pageSchema('المساعدات المالية', [
      tableBlockSchema('stipendDisbursements', ['disbursementNumber', 'stipendType', 'amount', 'period', 'status', 'disbursedAt'], 'صرف المكافآت'),
    ]),
    'iu-doc-requests': pageSchema('طلبات الوثائق', [
      tableBlockSchema('documentRequests', ['requestNumber', 'templateId', 'status', 'urgency'], 'طلبات الوثائق'),
    ]),
    'iu-doc-templates': pageSchema('قوالب الوثائق', [
      tableBlockSchema('documentTemplates', ['nameAr', 'type', 'language', 'active'], 'القوالب'),
    ]),
    'iu-emp-list': pageSchema('الموظفون', [
      tableBlockSchema('employees', ['employeeId', 'nameAr', 'jobTitle', 'employeeType', 'academicRank', 'status'], 'سجل الموظفين'),
    ]),
    'iu-leave-requests': pageSchema('طلبات الإجازة', [
      tableBlockSchema('leaveRequests', ['requestNumber', 'leaveType', 'startDate', 'endDate', 'totalDays', 'status'], 'طلبات الإجازة'),
    ]),
    'iu-leave-balances': pageSchema('أرصدة الإجازات', [
      tableBlockSchema('leaveBalances', ['leaveType', 'year', 'entitlement', 'used', 'remaining'], 'أرصدة الإجازات'),
    ]),
    'iu-tickets': pageSchema('تذاكر الدعم', [
      tableBlockSchema('supportTickets', ['ticketNumber', 'subject', 'category', 'priority', 'status', 'assignedTeam'], 'تذاكر الدعم'),
    ]),
    'iu-knowledge-base': pageSchema('قاعدة المعرفة', [
      tableBlockSchema('knowledgeBase', ['titleAr', 'category', 'published', 'viewCount', 'helpfulCount'], 'قاعدة المعرفة'),
    ]),
    'iu-venues': pageSchema('القاعات والمرافق', [
      tableBlockSchema('venues', ['nameAr', 'venueType', 'location', 'capacity', 'available'], 'المرافق'),
    ]),
    'iu-bookings': pageSchema('حجوزات المرافق', [
      tableBlockSchema('venueBookings', ['bookingNumber', 'eventTitle', 'date', 'timeStart', 'timeEnd', 'status'], 'الحجوزات'),
    ]),
    'iu-fleet': pageSchema('أسطول المركبات', [
      tableBlockSchema('fleetVehicles', ['plateNumber', 'vehicleType', 'make', 'mileage', 'status', 'nextServiceDate'], 'المركبات'),
    ]),
    'iu-course-eval': pageSchema('تقييم المقررات', [
      tableBlockSchema('evaluationResponses', ['courseCode', 'courseName', 'instructorName', 'college', 'overallRating'], 'استجابات التقييم'),
    ]),
    'iu-research': pageSchema('المنح البحثية', [
      tableBlockSchema('researchGrants', ['grantNumber', 'titleAr', 'researchArea', 'budgetApproved', 'durationMonths', 'status'], 'المنح البحثية'),
    ]),
    'iu-qa': pageSchema('ضمان الجودة', [
      tableBlockSchema('qaReviews', ['reviewNumber', 'programName', 'college', 'reviewType', 'accreditationBody', 'status', 'nextReviewDate'], 'مراجعات الجودة'),
    ]),
    'iu-alumni': pageSchema('الخريجون', [
      tableBlockSchema('alumni', ['nameAr', 'graduationYear', 'college', 'currentPosition', 'currentOrganization', 'country', 'willingToMentor'], 'سجل الخريجين'),
    ]),
    'iu-career': pageSchema('الخدمات المهنية', [
      tableBlockSchema('jobListings', ['title', 'company', 'location', 'type', 'deadline', 'targetCollege', 'active'], 'الوظائف المتاحة'),
    ]),
    'iu-events': pageSchema('الفعاليات', [
      tableBlockSchema('campusEvents', ['titleAr', 'eventType', 'startDate', 'location', 'capacity', 'registeredCount', 'status'], 'فعاليات الجامعة'),
    ]),
    'iu-library': pageSchema('المكتبة', [
      tableBlockSchema('libraryItems', ['titleAr', 'author', 'isbn', 'itemType', 'subject', 'availableCopies', 'status'], 'مقتنيات المكتبة'),
    ]),
  };
}
