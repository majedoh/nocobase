import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'evaluationPeriods',
  title: '{{t("Evaluation Periods", { ns: "iu-course-eval" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'string', name: 'nameAr', interface: 'input', uiSchema: { title: '{{t("Period Name (Arabic)", { ns: "iu-course-eval" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] } },
    { type: 'string', name: 'semester', interface: 'input', uiSchema: { title: '{{t("Semester", { ns: "iu-course-eval" })}}', 'x-component': 'Input' } },
    { type: 'date', name: 'openDate', interface: 'datetime', uiSchema: { title: '{{t("Open Date", { ns: "iu-course-eval" })}}', 'x-component': 'DatePicker' } },
    { type: 'date', name: 'closeDate', interface: 'datetime', uiSchema: { title: '{{t("Close Date", { ns: "iu-course-eval" })}}', 'x-component': 'DatePicker' } },
    { type: 'boolean', name: 'isActive', interface: 'checkbox', defaultValue: false, uiSchema: { title: '{{t("Active", { ns: "iu-course-eval" })}}', 'x-component': 'Checkbox' } },
    { type: 'hasMany', name: 'responses', target: 'evaluationResponses', foreignKey: 'periodId' },
  ],
});
