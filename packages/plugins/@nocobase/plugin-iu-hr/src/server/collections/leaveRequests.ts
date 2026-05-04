/**
 * Leave Requests Collection
 * Employee leave/vacation requests with approval workflow.
 * Compliant with Saudi Labor Law leave types.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'leaveRequests',
  title: '{{t("Leave Requests", { ns: "iu-hr" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'requestNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'LV' } },
        { type: 'date', options: { format: 'YYYY' } },
        { type: 'integer', options: { digits: 5, start: 1, key: 'leave' } },
      ],
      uiSchema: { title: '{{t("Request Number", { ns: "iu-hr" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'belongsTo', name: 'employee', target: 'employees', foreignKey: 'employeeId', interface: 'm2o',
      uiSchema: { title: '{{t("Employee", { ns: "iu-hr" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'leaveType', interface: 'select',
      uiSchema: {
        title: '{{t("Leave Type", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'annual', label: 'إجازة سنوية', color: 'blue' },
          { value: 'sick', label: 'إجازة مرضية', color: 'red' },
          { value: 'emergency', label: 'إجازة اضطرارية', color: 'orange' },
          { value: 'hajj', label: 'إجازة حج', color: 'gold' },
          { value: 'marriage', label: 'إجازة زواج', color: 'pink' },
          { value: 'paternity', label: 'إجازة أبوة', color: 'cyan' },
          { value: 'maternity', label: 'إجازة أمومة', color: 'purple' },
          { value: 'bereavement', label: 'إجازة وفاة', color: 'default' },
          { value: 'unpaid', label: 'إجازة بدون راتب', color: 'default' },
          { value: 'sabbatical', label: 'تفرغ علمي', color: 'green' },
          { value: 'official', label: 'مأمورية', color: 'processing' },
        ],
      },
    },
    {
      type: 'date', name: 'startDate', interface: 'datetime',
      uiSchema: { title: '{{t("Start Date", { ns: "iu-hr" })}}', 'x-component': 'DatePicker', 'x-validator': [{ required: true }] },
    },
    {
      type: 'date', name: 'endDate', interface: 'datetime',
      uiSchema: { title: '{{t("End Date", { ns: "iu-hr" })}}', 'x-component': 'DatePicker', 'x-validator': [{ required: true }] },
    },
    {
      type: 'integer', name: 'totalDays', interface: 'number',
      uiSchema: { title: '{{t("Total Days", { ns: "iu-hr" })}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
    },
    {
      type: 'text', name: 'reason', interface: 'textarea',
      uiSchema: { title: '{{t("Reason", { ns: "iu-hr" })}}', 'x-component': 'Input.TextArea', 'x-component-props': { rows: 3 } },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'pending',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'قيد الانتظار', color: 'default' },
          { value: 'approved_manager', label: 'موافقة المدير', color: 'processing' },
          { value: 'approved_hr', label: 'موافقة الموارد البشرية', color: 'success' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'cancelled', label: 'ملغى', color: 'default' },
        ],
      },
    },
    {
      type: 'belongsTo', name: 'approvedBy', target: 'users', foreignKey: 'approvedById', interface: 'm2o',
      uiSchema: { title: '{{t("Approved By", { ns: "iu-hr" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } } },
    },
    {
      type: 'text', name: 'rejectionReason', interface: 'textarea',
      uiSchema: { title: '{{t("Rejection Reason", { ns: "iu-hr" })}}', 'x-component': 'Input.TextArea' },
    },
    {
      type: 'string', name: 'delegateTo', interface: 'input',
      uiSchema: { title: '{{t("Delegate To", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
  ],
});
