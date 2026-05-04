/**
 * Document Templates Collection
 * Reusable letter/document templates with variable placeholders.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'documentTemplates',
  title: '{{t("Document Templates", { ns: "iu-documents" })}}',
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
      type: 'string',
      name: 'nameAr',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Template Name (Arabic)", { ns: "iu-documents" })}}',
        'x-component': 'Input',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'nameEn',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Template Name (English)", { ns: "iu-documents" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'type',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Document Type", { ns: "iu-documents" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'enrollment_verification', label: 'تعريف بالدراسة', color: 'blue' },
          { value: 'gpa_certificate', label: 'شهادة معدل', color: 'green' },
          { value: 'graduation_letter', label: 'خطاب تخرج', color: 'gold' },
          { value: 'recommendation', label: 'خطاب توصية', color: 'purple' },
          { value: 'disciplinary_record', label: 'سجل تأديبي', color: 'red' },
          { value: 'transfer_letter', label: 'خطاب تحويل', color: 'cyan' },
          { value: 'custom', label: 'مخصص', color: 'default' },
        ],
      },
    },
    {
      type: 'text',
      name: 'bodyTemplate',
      interface: 'markdown',
      uiSchema: {
        type: 'string',
        title: '{{t("Body Template", { ns: "iu-documents" })}}',
        'x-component': 'Markdown',
      },
    },
    {
      type: 'boolean',
      name: 'requiresApproval',
      interface: 'checkbox',
      defaultValue: true,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Requires Approval", { ns: "iu-documents" })}}',
        'x-component': 'Checkbox',
      },
    },
    {
      type: 'boolean',
      name: 'active',
      interface: 'checkbox',
      defaultValue: true,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Active", { ns: "iu-documents" })}}',
        'x-component': 'Checkbox',
      },
    },
    {
      type: 'hasMany',
      name: 'requests',
      target: 'documentRequests',
      foreignKey: 'templateId',
    },
  ],
});
