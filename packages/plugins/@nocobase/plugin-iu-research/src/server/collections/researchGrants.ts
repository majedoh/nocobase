import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'researchGrants', title: '{{t("Research Grants", { ns: "iu-research" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'sequence', name: 'grantNumber', interface: 'sequence', patterns: [{ type: 'string', options: { value: 'RG' } }, { type: 'date', options: { format: 'YYYY' } }, { type: 'integer', options: { digits: 4, start: 1, key: 'grant' } }], uiSchema: { title: '{{t("Grant Number", { ns: "iu-research" })}}', 'x-component': 'Input', 'x-read-pretty': true } },
    { type: 'string', name: 'titleAr', interface: 'input', uiSchema: { title: '{{t("Title (Arabic)", { ns: "iu-research" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] } },
    { type: 'string', name: 'titleEn', interface: 'input', uiSchema: { title: '{{t("Title (English)", { ns: "iu-research" })}}', 'x-component': 'Input' } },
    { type: 'belongsTo', name: 'principalInvestigator', target: 'employees', foreignKey: 'piId', interface: 'm2o', uiSchema: { title: '{{t("Principal Investigator", { ns: "iu-research" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } } },
    { type: 'string', name: 'researchArea', interface: 'select', uiSchema: { title: '{{t("Research Area", { ns: "iu-research" })}}', 'x-component': 'Select', enum: [
      { value: 'islamic_studies', label: 'دراسات إسلامية', color: 'green' }, { value: 'arabic_language', label: 'لغة عربية', color: 'cyan' },
      { value: 'engineering', label: 'هندسة', color: 'blue' }, { value: 'computer_science', label: 'حاسب آلي', color: 'purple' },
      { value: 'natural_sciences', label: 'علوم طبيعية', color: 'orange' }, { value: 'interdisciplinary', label: 'متعددة التخصصات', color: 'gold' },
    ] } },
    { type: 'float', name: 'budgetRequested', interface: 'number', uiSchema: { title: '{{t("Budget Requested (SAR)", { ns: "iu-research" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 0, precision: 2, addonAfter: 'ر.س' } } },
    { type: 'float', name: 'budgetApproved', interface: 'number', uiSchema: { title: '{{t("Budget Approved (SAR)", { ns: "iu-research" })}}', 'x-component': 'InputNumber', 'x-component-props': { precision: 2, addonAfter: 'ر.س' } } },
    { type: 'integer', name: 'durationMonths', interface: 'number', uiSchema: { title: '{{t("Duration (months)", { ns: "iu-research" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 60 } } },
    { type: 'date', name: 'startDate', interface: 'datetime', uiSchema: { title: '{{t("Start Date", { ns: "iu-research" })}}', 'x-component': 'DatePicker' } },
    { type: 'date', name: 'endDate', interface: 'datetime', uiSchema: { title: '{{t("End Date", { ns: "iu-research" })}}', 'x-component': 'DatePicker' } },
    { type: 'string', name: 'status', interface: 'select', defaultValue: 'proposal', uiSchema: { title: '{{t("Status", { ns: "iu-research" })}}', 'x-component': 'Select', enum: [
      { value: 'proposal', label: 'مقترح', color: 'default' }, { value: 'under_review', label: 'قيد المراجعة', color: 'processing' },
      { value: 'approved', label: 'معتمد', color: 'success' }, { value: 'active', label: 'جارٍ', color: 'blue' },
      { value: 'completed', label: 'مكتمل', color: 'cyan' }, { value: 'rejected', label: 'مرفوض', color: 'error' },
    ] } },
    { type: 'text', name: 'abstract', interface: 'markdown', uiSchema: { title: '{{t("Abstract", { ns: "iu-research" })}}', 'x-component': 'Markdown' } },
  ],
});
