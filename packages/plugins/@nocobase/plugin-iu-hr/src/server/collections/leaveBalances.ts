/**
 * Leave Balances Collection
 * Annual leave entitlements and remaining balances per employee.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'leaveBalances',
  title: '{{t("Leave Balances", { ns: "iu-hr" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'employee', target: 'employees', foreignKey: 'employeeId', interface: 'm2o',
      uiSchema: { title: '{{t("Employee", { ns: "iu-hr" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'leaveType', interface: 'select',
      uiSchema: {
        title: '{{t("Leave Type", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'annual', label: 'إجازة سنوية' },
          { value: 'sick', label: 'إجازة مرضية' },
          { value: 'emergency', label: 'إجازة اضطرارية' },
        ],
      },
    },
    {
      type: 'string', name: 'year', interface: 'input',
      uiSchema: { title: '{{t("Year", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'integer', name: 'entitlement', interface: 'number', defaultValue: 36,
      uiSchema: { title: '{{t("Entitlement (days)", { ns: "iu-hr" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'integer', name: 'used', interface: 'number', defaultValue: 0,
      uiSchema: { title: '{{t("Used (days)", { ns: "iu-hr" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'integer', name: 'remaining', interface: 'number',
      uiSchema: { title: '{{t("Remaining (days)", { ns: "iu-hr" })}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
    },
  ],
});
