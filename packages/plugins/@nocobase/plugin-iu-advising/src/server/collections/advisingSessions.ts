/**
 * Advising Sessions Collection
 * Documented advising meetings with action items and follow-ups.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'advisingSessions',
  title: '{{t("Advising Sessions", { ns: "iu-advising" })}}',
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'student', target: 'students',
      foreignKey: 'studentId', interface: 'm2o',
      uiSchema: {
        title: '{{t("Student", { ns: "iu-advising" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } },
      },
    },
    {
      type: 'belongsTo', name: 'advisor', target: 'users',
      foreignKey: 'advisorId', interface: 'm2o',
      uiSchema: {
        title: '{{t("Advisor", { ns: "iu-advising" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } },
      },
    },
    {
      type: 'date', name: 'sessionDate', interface: 'datetime',
      uiSchema: {
        title: '{{t("Session Date", { ns: "iu-advising" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { showTime: true },
      },
    },
    {
      type: 'string', name: 'sessionType', interface: 'select',
      uiSchema: {
        title: '{{t("Session Type", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'registration', label: 'تسجيل مقررات', color: 'blue' },
          { value: 'academic_plan', label: 'خطة دراسية', color: 'green' },
          { value: 'performance', label: 'أداء أكاديمي', color: 'orange' },
          { value: 'career', label: 'إرشاد مهني', color: 'purple' },
          { value: 'personal', label: 'شخصي', color: 'cyan' },
          { value: 'graduation', label: 'تخرج', color: 'gold' },
          { value: 'probation', label: 'اختبار أكاديمي', color: 'red' },
          { value: 'general', label: 'عام', color: 'default' },
        ],
      },
    },
    {
      type: 'text', name: 'notes', interface: 'markdown',
      uiSchema: {
        title: '{{t("Session Notes", { ns: "iu-advising" })}}',
        'x-component': 'Markdown',
      },
    },
    {
      type: 'text', name: 'actionItems', interface: 'textarea',
      uiSchema: {
        title: '{{t("Action Items", { ns: "iu-advising" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'date', name: 'followUpDate', interface: 'datetime',
      uiSchema: {
        title: '{{t("Follow-up Date", { ns: "iu-advising" })}}',
        'x-component': 'DatePicker',
      },
    },
    {
      type: 'string', name: 'outcome', interface: 'select',
      uiSchema: {
        title: '{{t("Outcome", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'resolved', label: 'تم الحل', color: 'success' },
          { value: 'follow_up_needed', label: 'يحتاج متابعة', color: 'warning' },
          { value: 'referred', label: 'تم التحويل', color: 'processing' },
          { value: 'no_show', label: 'لم يحضر', color: 'error' },
        ],
      },
    },
    {
      type: 'integer', name: 'durationMinutes', interface: 'number',
      defaultValue: 30,
      uiSchema: {
        title: '{{t("Duration (minutes)", { ns: "iu-advising" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 5, max: 120 },
      },
    },
  ],
});
