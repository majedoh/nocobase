/**
 * Student Flags Collection Definition
 * Academic holds, warnings, probation notices, and recognitions.
 * Flags drive workflow triggers (e.g., auto-notify advisor on probation).
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'studentFlags',
  title: '{{t("Student Flags", { ns: "iu-student-profile" })}}',
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    {
      type: 'snowflakeId',
      name: 'id',
      primaryKey: true,
      interface: 'integer',
      uiSchema: {
        type: 'number',
        title: '{{t("ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
    },
    {
      type: 'belongsTo',
      name: 'student',
      target: 'students',
      foreignKey: 'studentId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Student", { ns: "iu-student-profile" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nameAr', value: 'id' },
        },
      },
    },
    {
      type: 'string',
      name: 'type',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Flag Type", { ns: "iu-student-profile" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'hold', label: 'إيقاف', color: 'red' },
          { value: 'warning', label: 'إنذار', color: 'orange' },
          { value: 'probation', label: 'اختبار أكاديمي', color: 'yellow' },
          { value: 'recognition', label: 'تكريم', color: 'green' },
          { value: 'disciplinary', label: 'تأديبي', color: 'volcano' },
        ],
      },
    },
    {
      type: 'text',
      name: 'reason',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Reason", { ns: "iu-student-profile" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'severity',
      interface: 'select',
      defaultValue: 'medium',
      uiSchema: {
        type: 'string',
        title: '{{t("Severity", { ns: "iu-student-profile" })}}',
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
      type: 'boolean',
      name: 'active',
      interface: 'checkbox',
      defaultValue: true,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Active", { ns: "iu-student-profile" })}}',
        'x-component': 'Checkbox',
      },
    },
    {
      type: 'date',
      name: 'resolvedAt',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Resolved At", { ns: "iu-student-profile" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { showTime: true },
      },
    },
    {
      type: 'text',
      name: 'resolutionNotes',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Resolution Notes", { ns: "iu-student-profile" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 2 },
      },
    },
  ],
});
