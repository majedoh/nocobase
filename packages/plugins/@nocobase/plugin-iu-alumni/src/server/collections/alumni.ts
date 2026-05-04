import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'alumni', title: '{{t("Alumni", { ns: "iu-alumni" })}}', createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'string', name: 'nameAr', interface: 'input', uiSchema: { title: 'الاسم (عربي)', 'x-component': 'Input' } },
    { type: 'string', name: 'nameEn', interface: 'input', uiSchema: { title: 'الاسم (إنجليزي)', 'x-component': 'Input' } },
    { type: 'string', name: 'graduationYear', interface: 'input', uiSchema: { title: 'سنة التخرج', 'x-component': 'Input' } },
    { type: 'string', name: 'college', interface: 'select', uiSchema: { title: 'الكلية', 'x-component': 'Select', enum: [
      { value: 'sharia', label: 'الشريعة' }, { value: 'dawah', label: 'الدعوة' }, { value: 'quran', label: 'القرآن' },
      { value: 'hadith', label: 'الحديث' }, { value: 'arabic', label: 'اللغة العربية' },
      { value: 'engineering', label: 'الهندسة' }, { value: 'science', label: 'العلوم' }, { value: 'cs', label: 'الحاسب' },
    ] } },
    { type: 'string', name: 'degree', interface: 'input', uiSchema: { title: 'الدرجة العلمية', 'x-component': 'Input' } },
    { type: 'string', name: 'currentPosition', interface: 'input', uiSchema: { title: 'المنصب الحالي', 'x-component': 'Input' } },
    { type: 'string', name: 'currentOrganization', interface: 'input', uiSchema: { title: 'جهة العمل', 'x-component': 'Input' } },
    { type: 'string', name: 'country', interface: 'input', uiSchema: { title: 'البلد', 'x-component': 'Input' } },
    { type: 'string', name: 'email', interface: 'email', uiSchema: { title: 'البريد الإلكتروني', 'x-component': 'Input' } },
    { type: 'string', name: 'phone', interface: 'phone', uiSchema: { title: 'الهاتف', 'x-component': 'Input' } },
    { type: 'boolean', name: 'willingToMentor', interface: 'checkbox', defaultValue: false, uiSchema: { title: 'مستعد للإرشاد', 'x-component': 'Checkbox' } },
    { type: 'text', name: 'bio', interface: 'textarea', uiSchema: { title: 'نبذة', 'x-component': 'Input.TextArea' } },
  ],
});
