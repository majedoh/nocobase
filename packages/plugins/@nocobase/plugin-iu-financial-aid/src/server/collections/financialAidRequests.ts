/**
 * Financial Aid Requests Collection
 * Student requests for additional financial support, emergency funds, etc.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'financialAidRequests',
  title: '{{t("Financial Aid Requests", { ns: "iu-financial-aid" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'requestNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'FIN' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 4, start: 1, key: 'finaid' } },
      ],
      uiSchema: { title: '{{t("Request Number", { ns: "iu-financial-aid" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'belongsTo', name: 'student', target: 'students', foreignKey: 'studentId', interface: 'm2o',
      uiSchema: { title: '{{t("Student", { ns: "iu-financial-aid" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'requestType', interface: 'select',
      uiSchema: {
        title: '{{t("Request Type", { ns: "iu-financial-aid" })}}', 'x-component': 'Select',
        enum: [
          { value: 'emergency_fund', label: 'صندوق طوارئ', color: 'red' },
          { value: 'tuition_waiver', label: 'إعفاء رسوم', color: 'blue' },
          { value: 'book_allowance', label: 'بدل كتب إضافي', color: 'cyan' },
          { value: 'medical_assistance', label: 'مساعدة طبية', color: 'green' },
          { value: 'travel_grant', label: 'منحة سفر', color: 'orange' },
          { value: 'scholarship_upgrade', label: 'ترقية منحة', color: 'gold' },
          { value: 'other', label: 'أخرى', color: 'default' },
        ],
      },
    },
    {
      type: 'float', name: 'requestedAmount', interface: 'number',
      uiSchema: {
        title: '{{t("Requested Amount (SAR)", { ns: "iu-financial-aid" })}}', 'x-component': 'InputNumber',
        'x-component-props': { min: 0, precision: 2, addonAfter: 'ر.س' },
      },
    },
    {
      type: 'float', name: 'approvedAmount', interface: 'number',
      uiSchema: {
        title: '{{t("Approved Amount (SAR)", { ns: "iu-financial-aid" })}}', 'x-component': 'InputNumber',
        'x-component-props': { min: 0, precision: 2, addonAfter: 'ر.س' },
      },
    },
    {
      type: 'text', name: 'justification', interface: 'textarea',
      uiSchema: { title: '{{t("Justification", { ns: "iu-financial-aid" })}}', 'x-component': 'Input.TextArea', 'x-component-props': { rows: 4 } },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'submitted',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-financial-aid" })}}', 'x-component': 'Select',
        enum: [
          { value: 'submitted', label: 'مقدّم', color: 'default' },
          { value: 'under_review', label: 'قيد المراجعة', color: 'processing' },
          { value: 'approved', label: 'مقبول', color: 'success' },
          { value: 'partially_approved', label: 'مقبول جزئياً', color: 'warning' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'disbursed', label: 'تم الصرف', color: 'cyan' },
        ],
      },
    },
    {
      type: 'belongsTo', name: 'reviewedBy', target: 'users', foreignKey: 'reviewedById', interface: 'm2o',
      uiSchema: { title: '{{t("Reviewed By", { ns: "iu-financial-aid" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } } },
    },
    {
      type: 'text', name: 'reviewNotes', interface: 'textarea',
      uiSchema: { title: '{{t("Review Notes", { ns: "iu-financial-aid" })}}', 'x-component': 'Input.TextArea' },
    },
  ],
});
