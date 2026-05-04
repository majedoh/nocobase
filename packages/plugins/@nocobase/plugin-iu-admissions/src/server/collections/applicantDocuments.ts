/**
 * Applicant Documents Collection
 * Required documents for admission application (transcripts, passport, certificates).
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'applicantDocuments',
  title: '{{t("Applicant Documents", { ns: "iu-admissions" })}}',
  createdBy: true,
  logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'applicant', target: 'applicants',
      foreignKey: 'applicantId', interface: 'm2o',
      uiSchema: {
        title: '{{t("Applicant", { ns: "iu-admissions" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } },
      },
    },
    {
      type: 'string', name: 'documentType', interface: 'select',
      uiSchema: {
        title: '{{t("Document Type", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'passport', label: 'جواز السفر' },
          { value: 'high_school_cert', label: 'شهادة الثانوية العامة' },
          { value: 'transcript', label: 'كشف الدرجات' },
          { value: 'medical_report', label: 'التقرير الطبي' },
          { value: 'recommendation_letter', label: 'خطاب توصية' },
          { value: 'photo', label: 'صورة شخصية' },
          { value: 'quran_certification', label: 'شهادة حفظ القرآن' },
          { value: 'language_test', label: 'اختبار لغة' },
          { value: 'other', label: 'أخرى' },
        ],
      },
    },
    {
      type: 'string', name: 'status', interface: 'select',
      defaultValue: 'pending',
      uiSchema: {
        title: '{{t("Verification Status", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'بانتظار المراجعة', color: 'default' },
          { value: 'verified', label: 'تم التحقق', color: 'success' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'missing', label: 'مفقود', color: 'warning' },
        ],
      },
    },
    {
      type: 'text', name: 'verificationNotes', interface: 'textarea',
      uiSchema: {
        title: '{{t("Verification Notes", { ns: "iu-admissions" })}}',
        'x-component': 'Input.TextArea',
      },
    },
    {
      type: 'date', name: 'expiryDate', interface: 'datetime',
      uiSchema: {
        title: '{{t("Expiry Date", { ns: "iu-admissions" })}}',
        'x-component': 'DatePicker',
      },
    },
  ],
});
