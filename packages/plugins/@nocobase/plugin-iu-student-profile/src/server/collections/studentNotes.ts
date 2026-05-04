/**
 * Student Notes Collection Definition
 * CRM interaction notes attached to student records.
 * Used by advisors, department heads, and support staff.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'studentNotes',
  title: '{{t("Student Notes", { ns: "iu-student-profile" })}}',
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
      name: 'category',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Category", { ns: "iu-student-profile" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'academic', label: 'أكاديمي', color: 'blue' },
          { value: 'behavioral', label: 'سلوكي', color: 'orange' },
          { value: 'financial', label: 'مالي', color: 'gold' },
          { value: 'housing', label: 'سكن', color: 'cyan' },
          { value: 'health', label: 'صحي', color: 'red' },
          { value: 'advising', label: 'إرشاد أكاديمي', color: 'purple' },
          { value: 'general', label: 'عام', color: 'default' },
        ],
      },
    },
    {
      type: 'text',
      name: 'content',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Content", { ns: "iu-student-profile" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 4 },
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'followUpAction',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Follow-up Action", { ns: "iu-student-profile" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'date',
      name: 'followUpDate',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Follow-up Date", { ns: "iu-student-profile" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { dateFormat: 'YYYY-MM-DD' },
      },
    },
    {
      type: 'boolean',
      name: 'isInternal',
      interface: 'checkbox',
      defaultValue: true,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Internal Only", { ns: "iu-student-profile" })}}',
        'x-component': 'Checkbox',
      },
    },
  ],
});
