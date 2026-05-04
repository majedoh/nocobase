import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'maintenanceRequests',
  title: '{{t("Maintenance Requests", { ns: "iu-housing" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'ticketNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'MNT' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 4, start: 1, key: 'maintenance' } },
      ],
      uiSchema: { title: '{{t("Ticket Number", { ns: "iu-housing" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'belongsTo', name: 'room', target: 'rooms', foreignKey: 'roomId', interface: 'm2o',
      uiSchema: { title: '{{t("Room", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'roomNumber', value: 'id' } } },
    },
    {
      type: 'belongsTo', name: 'reporter', target: 'students', foreignKey: 'reporterStudentId', interface: 'm2o',
      uiSchema: { title: '{{t("Reported By", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'issueType', interface: 'select',
      uiSchema: {
        title: '{{t("Issue Type", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'plumbing', label: 'سباكة' },
          { value: 'electrical', label: 'كهرباء' },
          { value: 'ac', label: 'تكييف' },
          { value: 'furniture', label: 'أثاث' },
          { value: 'cleaning', label: 'نظافة' },
          { value: 'pest', label: 'حشرات' },
          { value: 'door_lock', label: 'باب/قفل' },
          { value: 'other', label: 'أخرى' },
        ],
      },
    },
    {
      type: 'text', name: 'description', interface: 'textarea',
      uiSchema: { title: '{{t("Description", { ns: "iu-housing" })}}', 'x-component': 'Input.TextArea', 'x-component-props': { rows: 3 } },
    },
    {
      type: 'string', name: 'priority', interface: 'select', defaultValue: 'medium',
      uiSchema: {
        title: '{{t("Priority", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'low', label: 'منخفض', color: 'default' },
          { value: 'medium', label: 'متوسط', color: 'orange' },
          { value: 'high', label: 'عالي', color: 'red' },
          { value: 'urgent', label: 'عاجل', color: 'volcano' },
        ],
      },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'open',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'open', label: 'مفتوح', color: 'error' },
          { value: 'assigned', label: 'تم التعيين', color: 'processing' },
          { value: 'in_progress', label: 'قيد التنفيذ', color: 'warning' },
          { value: 'completed', label: 'مكتمل', color: 'success' },
          { value: 'closed', label: 'مغلق', color: 'default' },
        ],
      },
    },
    {
      type: 'belongsTo', name: 'assignedTo', target: 'users', foreignKey: 'assignedToId', interface: 'm2o',
      uiSchema: { title: '{{t("Assigned To", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } } },
    },
    {
      type: 'date', name: 'completedAt', interface: 'datetime',
      uiSchema: { title: '{{t("Completed At", { ns: "iu-housing" })}}', 'x-component': 'DatePicker', 'x-component-props': { showTime: true } },
    },
  ],
});
