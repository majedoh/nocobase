import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'campusEvents', title: '{{t("Campus Events", { ns: "iu-events" })}}', createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'string', name: 'titleAr', interface: 'input', uiSchema: { title: 'العنوان (عربي)', 'x-component': 'Input', 'x-validator': [{ required: true }] } },
    { type: 'string', name: 'titleEn', interface: 'input', uiSchema: { title: 'العنوان (إنجليزي)', 'x-component': 'Input' } },
    { type: 'string', name: 'eventType', interface: 'select', uiSchema: { title: 'نوع الفعالية', 'x-component': 'Select', enum: [
      { value: 'lecture', label: 'محاضرة', color: 'blue' }, { value: 'seminar', label: 'ندوة', color: 'green' },
      { value: 'workshop', label: 'ورشة عمل', color: 'purple' }, { value: 'conference', label: 'مؤتمر', color: 'gold' },
      { value: 'sports', label: 'رياضي', color: 'orange' }, { value: 'cultural', label: 'ثقافي', color: 'cyan' },
      { value: 'graduation', label: 'تخرج', color: 'red' }, { value: 'religious', label: 'ديني', color: 'green' },
    ] } },
    { type: 'text', name: 'description', interface: 'markdown', uiSchema: { title: 'الوصف', 'x-component': 'Markdown' } },
    { type: 'date', name: 'startDate', interface: 'datetime', uiSchema: { title: 'تاريخ البداية', 'x-component': 'DatePicker', 'x-component-props': { showTime: true } } },
    { type: 'date', name: 'endDate', interface: 'datetime', uiSchema: { title: 'تاريخ النهاية', 'x-component': 'DatePicker', 'x-component-props': { showTime: true } } },
    { type: 'string', name: 'location', interface: 'input', uiSchema: { title: 'المكان', 'x-component': 'Input' } },
    { type: 'integer', name: 'capacity', interface: 'number', uiSchema: { title: 'السعة', 'x-component': 'InputNumber' } },
    { type: 'integer', name: 'registeredCount', interface: 'number', defaultValue: 0, uiSchema: { title: 'عدد المسجلين', 'x-component': 'InputNumber', 'x-read-pretty': true } },
    { type: 'string', name: 'organizer', interface: 'input', uiSchema: { title: 'الجهة المنظمة', 'x-component': 'Input' } },
    { type: 'string', name: 'status', interface: 'select', defaultValue: 'upcoming', uiSchema: { title: 'الحالة', 'x-component': 'Select', enum: [
      { value: 'upcoming', label: 'قادم', color: 'blue' }, { value: 'ongoing', label: 'جارٍ', color: 'processing' },
      { value: 'completed', label: 'مكتمل', color: 'success' }, { value: 'cancelled', label: 'ملغى', color: 'error' },
    ] } },
    { type: 'boolean', name: 'requiresRegistration', interface: 'checkbox', defaultValue: false, uiSchema: { title: 'يتطلب تسجيل', 'x-component': 'Checkbox' } },
  ],
});
