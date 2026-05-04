/**
 * Stipend Disbursements Collection
 * Tracks monthly/semester scholarship stipend payments to students.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'stipendDisbursements',
  title: '{{t("Stipend Disbursements", { ns: "iu-financial-aid" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'disbursementNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'STD' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 5, start: 1, key: 'stipend' } },
      ],
      uiSchema: { title: '{{t("Disbursement Number", { ns: "iu-financial-aid" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'belongsTo', name: 'student', target: 'students', foreignKey: 'studentId', interface: 'm2o',
      uiSchema: { title: '{{t("Student", { ns: "iu-financial-aid" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'stipendType', interface: 'select',
      uiSchema: {
        title: '{{t("Stipend Type", { ns: "iu-financial-aid" })}}', 'x-component': 'Select',
        enum: [
          { value: 'monthly', label: 'مكافأة شهرية', color: 'blue' },
          { value: 'excellence', label: 'مكافأة تفوق', color: 'gold' },
          { value: 'research', label: 'مكافأة بحث', color: 'purple' },
          { value: 'arrival', label: 'بدل قدوم', color: 'green' },
          { value: 'books', label: 'بدل كتب', color: 'cyan' },
          { value: 'travel', label: 'بدل سفر', color: 'orange' },
          { value: 'graduation', label: 'مكافأة تخرج', color: 'gold' },
        ],
      },
    },
    {
      type: 'float', name: 'amount', interface: 'number',
      uiSchema: {
        title: '{{t("Amount (SAR)", { ns: "iu-financial-aid" })}}', 'x-component': 'InputNumber',
        'x-component-props': { min: 0, step: 0.01, precision: 2, addonAfter: 'ر.س' },
      },
    },
    {
      type: 'string', name: 'period', interface: 'input',
      uiSchema: { title: '{{t("Period", { ns: "iu-financial-aid" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'pending',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-financial-aid" })}}', 'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'قيد الانتظار', color: 'default' },
          { value: 'approved', label: 'معتمد', color: 'processing' },
          { value: 'disbursed', label: 'تم الصرف', color: 'success' },
          { value: 'on_hold', label: 'موقوف', color: 'error' },
          { value: 'cancelled', label: 'ملغى', color: 'default' },
        ],
      },
    },
    {
      type: 'string', name: 'holdReason', interface: 'input',
      uiSchema: { title: '{{t("Hold Reason", { ns: "iu-financial-aid" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'bankAccount', interface: 'input',
      uiSchema: { title: '{{t("Bank Account (IBAN)", { ns: "iu-financial-aid" })}}', 'x-component': 'Input' },
    },
    {
      type: 'date', name: 'disbursedAt', interface: 'datetime',
      uiSchema: { title: '{{t("Disbursed At", { ns: "iu-financial-aid" })}}', 'x-component': 'DatePicker', 'x-component-props': { showTime: true } },
    },
  ],
});
