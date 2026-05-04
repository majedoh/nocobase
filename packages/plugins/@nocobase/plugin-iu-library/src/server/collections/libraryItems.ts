import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'libraryItems', title: '{{t("Library Items", { ns: "iu-library" })}}', createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'string', name: 'titleAr', interface: 'input', uiSchema: { title: 'العنوان (عربي)', 'x-component': 'Input', 'x-validator': [{ required: true }] } },
    { type: 'string', name: 'titleEn', interface: 'input', uiSchema: { title: 'العنوان (إنجليزي)', 'x-component': 'Input' } },
    { type: 'string', name: 'author', interface: 'input', uiSchema: { title: 'المؤلف', 'x-component': 'Input' } },
    { type: 'string', name: 'isbn', interface: 'input', uiSchema: { title: 'ISBN', 'x-component': 'Input' } },
    { type: 'string', name: 'itemType', interface: 'select', uiSchema: { title: 'النوع', 'x-component': 'Select', enum: [
      { value: 'book', label: 'كتاب' }, { value: 'journal', label: 'مجلة' }, { value: 'thesis', label: 'رسالة علمية' },
      { value: 'manuscript', label: 'مخطوطة' }, { value: 'digital', label: 'رقمي' }, { value: 'multimedia', label: 'وسائط متعددة' },
    ] } },
    { type: 'string', name: 'subject', interface: 'select', uiSchema: { title: 'التخصص', 'x-component': 'Select', enum: [
      { value: 'islamic_sciences', label: 'علوم شرعية' }, { value: 'arabic_literature', label: 'أدب عربي' },
      { value: 'engineering', label: 'هندسة' }, { value: 'computer_science', label: 'حاسب آلي' },
      { value: 'natural_sciences', label: 'علوم طبيعية' }, { value: 'general', label: 'عام' },
    ] } },
    { type: 'string', name: 'location', interface: 'input', uiSchema: { title: 'الموقع/الرف', 'x-component': 'Input' } },
    { type: 'integer', name: 'totalCopies', interface: 'number', defaultValue: 1, uiSchema: { title: 'إجمالي النسخ', 'x-component': 'InputNumber' } },
    { type: 'integer', name: 'availableCopies', interface: 'number', defaultValue: 1, uiSchema: { title: 'النسخ المتاحة', 'x-component': 'InputNumber' } },
    { type: 'string', name: 'status', interface: 'select', defaultValue: 'available', uiSchema: { title: 'الحالة', 'x-component': 'Select', enum: [
      { value: 'available', label: 'متاح', color: 'green' }, { value: 'checked_out', label: 'معار', color: 'orange' },
      { value: 'reserved', label: 'محجوز', color: 'blue' }, { value: 'lost', label: 'مفقود', color: 'red' },
    ] } },
    { type: 'integer', name: 'publishYear', interface: 'number', uiSchema: { title: 'سنة النشر', 'x-component': 'InputNumber' } },
  ],
});
