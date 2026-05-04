import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'supportTickets',
  title: '{{t("Support Tickets", { ns: "iu-helpdesk" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'ticketNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'TKT' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 5, start: 1, key: 'ticket' } },
      ],
      uiSchema: { title: '{{t("Ticket Number", { ns: "iu-helpdesk" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'string', name: 'subject', interface: 'input',
      uiSchema: { title: '{{t("Subject", { ns: "iu-helpdesk" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'text', name: 'description', interface: 'markdown',
      uiSchema: { title: '{{t("Description", { ns: "iu-helpdesk" })}}', 'x-component': 'Markdown' },
    },
    {
      type: 'string', name: 'category', interface: 'select',
      uiSchema: {
        title: '{{t("Category", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'it_hardware', label: 'أجهزة وتقنيات', color: 'blue' },
          { value: 'it_software', label: 'برمجيات', color: 'cyan' },
          { value: 'it_network', label: 'شبكات وإنترنت', color: 'purple' },
          { value: 'it_email', label: 'بريد إلكتروني', color: 'orange' },
          { value: 'it_sis', label: 'نظام معلومات الطلاب', color: 'green' },
          { value: 'it_lms', label: 'نظام التعلم الإلكتروني', color: 'gold' },
          { value: 'general', label: 'استفسار عام', color: 'default' },
          { value: 'complaint', label: 'شكوى', color: 'red' },
          { value: 'suggestion', label: 'اقتراح', color: 'lime' },
          { value: 'access_request', label: 'طلب صلاحية', color: 'processing' },
        ],
      },
    },
    {
      type: 'string', name: 'priority', interface: 'select', defaultValue: 'medium',
      uiSchema: {
        title: '{{t("Priority", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'low', label: 'منخفض', color: 'default' },
          { value: 'medium', label: 'متوسط', color: 'orange' },
          { value: 'high', label: 'عالي', color: 'red' },
          { value: 'critical', label: 'حرج', color: 'volcano' },
        ],
      },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'open',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'open', label: 'مفتوح', color: 'error' },
          { value: 'assigned', label: 'تم التعيين', color: 'processing' },
          { value: 'in_progress', label: 'قيد المعالجة', color: 'warning' },
          { value: 'pending_user', label: 'بانتظار المستخدم', color: 'orange' },
          { value: 'resolved', label: 'تم الحل', color: 'success' },
          { value: 'closed', label: 'مغلق', color: 'default' },
          { value: 'reopened', label: 'أعيد فتحه', color: 'volcano' },
        ],
      },
    },
    {
      type: 'string', name: 'requesterType', interface: 'select',
      uiSchema: {
        title: '{{t("Requester Type", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'student', label: 'طالب' },
          { value: 'employee', label: 'موظف' },
          { value: 'faculty', label: 'عضو هيئة تدريس' },
        ],
      },
    },
    {
      type: 'belongsTo', name: 'assignedTo', target: 'users', foreignKey: 'assignedToId', interface: 'm2o',
      uiSchema: { title: '{{t("Assigned To", { ns: "iu-helpdesk" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } } },
    },
    {
      type: 'string', name: 'assignedTeam', interface: 'select',
      uiSchema: {
        title: '{{t("Assigned Team", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'it_support', label: 'الدعم الفني' },
          { value: 'network', label: 'الشبكات' },
          { value: 'systems', label: 'الأنظمة' },
          { value: 'student_affairs', label: 'شؤون الطلاب' },
          { value: 'registrar', label: 'القبول والتسجيل' },
        ],
      },
    },
    {
      type: 'date', name: 'resolvedAt', interface: 'datetime',
      uiSchema: { title: '{{t("Resolved At", { ns: "iu-helpdesk" })}}', 'x-component': 'DatePicker', 'x-component-props': { showTime: true } },
    },
    {
      type: 'text', name: 'resolution', interface: 'textarea',
      uiSchema: { title: '{{t("Resolution", { ns: "iu-helpdesk" })}}', 'x-component': 'Input.TextArea', 'x-component-props': { rows: 3 } },
    },
    {
      type: 'integer', name: 'satisfaction', interface: 'number',
      uiSchema: { title: '{{t("Satisfaction (1-5)", { ns: "iu-helpdesk" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } },
    },
    { type: 'hasMany', name: 'replies', target: 'ticketReplies', foreignKey: 'ticketId' },
  ],
});
