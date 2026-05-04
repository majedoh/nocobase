import { defineCollection } from '@nocobase/database';
export default defineCollection({
  name: 'qaReviews', title: '{{t("QA Reviews", { ns: "iu-qa" })}}', createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'sequence', name: 'reviewNumber', interface: 'sequence', patterns: [{ type: 'string', options: { value: 'QA' } }, { type: 'date', options: { format: 'YYYY' } }, { type: 'integer', options: { digits: 3, start: 1, key: 'qa' } }], uiSchema: { title: '{{t("Review Number")}}', 'x-component': 'Input', 'x-read-pretty': true } },
    { type: 'string', name: 'programName', interface: 'input', uiSchema: { title: '{{t("Program Name")}}', 'x-component': 'Input' } },
    { type: 'string', name: 'college', interface: 'select', uiSchema: { title: '{{t("College")}}', 'x-component': 'Select', enum: [
      { value: 'sharia', label: 'كلية الشريعة' }, { value: 'dawah', label: 'كلية الدعوة' }, { value: 'quran', label: 'كلية القرآن' },
      { value: 'hadith', label: 'كلية الحديث' }, { value: 'arabic', label: 'كلية اللغة العربية' },
      { value: 'engineering', label: 'كلية الهندسة' }, { value: 'science', label: 'كلية العلوم' }, { value: 'cs', label: 'كلية الحاسب' },
    ] } },
    { type: 'string', name: 'reviewType', interface: 'select', uiSchema: { title: '{{t("Review Type")}}', 'x-component': 'Select', enum: [
      { value: 'self_study', label: 'دراسة ذاتية' }, { value: 'peer_review', label: 'مراجعة نظراء' },
      { value: 'external_audit', label: 'تدقيق خارجي' }, { value: 'accreditation', label: 'اعتماد' },
    ] } },
    { type: 'string', name: 'accreditationBody', interface: 'select', uiSchema: { title: '{{t("Accreditation Body")}}', 'x-component': 'Select', enum: [
      { value: 'ncaaa', label: 'الهيئة الوطنية للتقويم والاعتماد' }, { value: 'abet', label: 'ABET' },
      { value: 'aacsb', label: 'AACSB' }, { value: 'internal', label: 'داخلي' },
    ] } },
    { type: 'string', name: 'status', interface: 'select', defaultValue: 'planned', uiSchema: { title: '{{t("Status")}}', 'x-component': 'Select', enum: [
      { value: 'planned', label: 'مخطط', color: 'default' }, { value: 'in_progress', label: 'جارٍ', color: 'processing' },
      { value: 'completed', label: 'مكتمل', color: 'success' }, { value: 'accredited', label: 'معتمد', color: 'green' },
      { value: 'needs_improvement', label: 'يحتاج تحسين', color: 'warning' },
    ] } },
    { type: 'text', name: 'findings', interface: 'markdown', uiSchema: { title: '{{t("Findings")}}', 'x-component': 'Markdown' } },
    { type: 'date', name: 'reviewDate', interface: 'datetime', uiSchema: { title: '{{t("Review Date")}}', 'x-component': 'DatePicker' } },
    { type: 'date', name: 'nextReviewDate', interface: 'datetime', uiSchema: { title: '{{t("Next Review Date")}}', 'x-component': 'DatePicker' } },
  ],
});
