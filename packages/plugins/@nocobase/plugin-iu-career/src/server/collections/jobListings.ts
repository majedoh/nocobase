import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'jobListings', title: '{{t("Job Listings", { ns: "iu-career" })}}', createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'string', name: 'title', interface: 'input', uiSchema: { title: 'المسمى الوظيفي', 'x-component': 'Input', 'x-validator': [{ required: true }] } },
    { type: 'string', name: 'company', interface: 'input', uiSchema: { title: 'الشركة', 'x-component': 'Input' } },
    { type: 'string', name: 'location', interface: 'input', uiSchema: { title: 'الموقع', 'x-component': 'Input' } },
    { type: 'string', name: 'type', interface: 'select', uiSchema: { title: 'نوع الوظيفة', 'x-component': 'Select', enum: [
      { value: 'full_time', label: 'دوام كامل' }, { value: 'part_time', label: 'دوام جزئي' },
      { value: 'internship', label: 'تدريب تعاوني' }, { value: 'contract', label: 'عقد' },
    ] } },
    { type: 'text', name: 'description', interface: 'markdown', uiSchema: { title: 'الوصف', 'x-component': 'Markdown' } },
    { type: 'text', name: 'requirements', interface: 'textarea', uiSchema: { title: 'المتطلبات', 'x-component': 'Input.TextArea' } },
    { type: 'date', name: 'deadline', interface: 'datetime', uiSchema: { title: 'آخر موعد', 'x-component': 'DatePicker' } },
    { type: 'boolean', name: 'active', interface: 'checkbox', defaultValue: true, uiSchema: { title: 'نشط', 'x-component': 'Checkbox' } },
    { type: 'string', name: 'targetCollege', interface: 'select', uiSchema: { title: 'الكلية المستهدفة', 'x-component': 'Select', enum: [
      { value: 'all', label: 'الكل' }, { value: 'engineering', label: 'الهندسة' }, { value: 'cs', label: 'الحاسب' },
      { value: 'science', label: 'العلوم' }, { value: 'sharia', label: 'الشريعة' },
    ] } },
  ],
});
