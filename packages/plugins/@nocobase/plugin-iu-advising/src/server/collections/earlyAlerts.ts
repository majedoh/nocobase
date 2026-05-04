/**
 * Early Alerts Collection
 * Automated and manual alerts for at-risk students.
 * Triggers notifications to advisors, department chairs, and student affairs.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'earlyAlerts',
  title: '{{t("Early Alerts", { ns: "iu-advising" })}}',
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'alertNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'EA' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 4, start: 1, key: 'earlyalert' } },
      ],
      uiSchema: {
        title: '{{t("Alert Number", { ns: "iu-advising" })}}',
        'x-component': 'Input',
        'x-read-pretty': true,
      },
    },
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
      type: 'string', name: 'triggerReason', interface: 'select',
      uiSchema: {
        title: '{{t("Trigger Reason", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'low_gpa', label: 'انخفاض المعدل التراكمي', color: 'red' },
          { value: 'excessive_absences', label: 'غياب مفرط', color: 'orange' },
          { value: 'failed_courses', label: 'رسوب في مقررات', color: 'red' },
          { value: 'credits_behind', label: 'تأخر في الساعات', color: 'warning' },
          { value: 'behavioral', label: 'سلوكي', color: 'volcano' },
          { value: 'financial_hold', label: 'إيقاف مالي', color: 'orange' },
          { value: 'manual', label: 'يدوي', color: 'default' },
        ],
      },
    },
    {
      type: 'string', name: 'severity', interface: 'select',
      defaultValue: 'medium',
      uiSchema: {
        title: '{{t("Severity", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'low', label: 'منخفض', color: 'default' },
          { value: 'medium', label: 'متوسط', color: 'orange' },
          { value: 'high', label: 'عالي', color: 'red' },
          { value: 'critical', label: 'حرج', color: 'volcano' },
        ],
      },
    },
    {
      type: 'text', name: 'description', interface: 'textarea',
      uiSchema: {
        title: '{{t("Description", { ns: "iu-advising" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'string', name: 'status', interface: 'select',
      defaultValue: 'open',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'open', label: 'مفتوح', color: 'error' },
          { value: 'in_progress', label: 'قيد المعالجة', color: 'processing' },
          { value: 'resolved', label: 'تم الحل', color: 'success' },
          { value: 'escalated', label: 'تم التصعيد', color: 'volcano' },
        ],
      },
    },
    {
      type: 'text', name: 'interventionPlan', interface: 'textarea',
      uiSchema: {
        title: '{{t("Intervention Plan", { ns: "iu-advising" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'text', name: 'resolutionNotes', interface: 'textarea',
      uiSchema: {
        title: '{{t("Resolution Notes", { ns: "iu-advising" })}}',
        'x-component': 'Input.TextArea',
      },
    },
    {
      type: 'date', name: 'resolvedAt', interface: 'datetime',
      uiSchema: {
        title: '{{t("Resolved At", { ns: "iu-advising" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { showTime: true },
      },
    },
  ],
});
