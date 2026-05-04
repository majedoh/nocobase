/**
 * Document Archive Collection
 * Generated documents stored for historical reference and audit.
 * Each record links to the original request and stores the rendered content.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'documentArchive',
  title: '{{t("Document Archive", { ns: "iu-documents" })}}',
  createdBy: true,
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
      type: 'sequence',
      name: 'archiveNumber',
      interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'ARC' } },
        { type: 'date', options: { format: 'YYYY' } },
        { type: 'integer', options: { digits: 6, start: 1, key: 'archive' } },
      ],
      uiSchema: {
        type: 'string',
        title: '{{t("Archive Number", { ns: "iu-documents" })}}',
        'x-component': 'Input',
        'x-read-pretty': true,
      },
    },
    {
      type: 'belongsTo',
      name: 'request',
      target: 'documentRequests',
      foreignKey: 'requestId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Original Request", { ns: "iu-documents" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'requestNumber', value: 'id' },
        },
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
        title: '{{t("Student", { ns: "iu-documents" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nameAr', value: 'id' },
        },
      },
    },
    {
      type: 'string',
      name: 'documentType',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Document Type", { ns: "iu-documents" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'enrollment_verification', label: 'تعريف بالدراسة' },
          { value: 'gpa_certificate', label: 'شهادة معدل' },
          { value: 'graduation_letter', label: 'خطاب تخرج' },
          { value: 'recommendation', label: 'خطاب توصية' },
          { value: 'disciplinary_record', label: 'سجل تأديبي' },
          { value: 'transfer_letter', label: 'خطاب تحويل' },
          { value: 'custom', label: 'مخصص' },
        ],
      },
    },
    {
      type: 'text',
      name: 'renderedContent',
      interface: 'markdown',
      uiSchema: {
        type: 'string',
        title: '{{t("Document Content", { ns: "iu-documents" })}}',
        'x-component': 'Markdown',
        'x-read-pretty': true,
      },
    },
    {
      type: 'string',
      name: 'signedBy',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Signed By", { ns: "iu-documents" })}}',
        'x-component': 'Input',
        'x-read-pretty': true,
      },
    },
    {
      type: 'date',
      name: 'issuedAt',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Issued At", { ns: "iu-documents" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { showTime: true },
        'x-read-pretty': true,
      },
    },
    {
      type: 'boolean',
      name: 'isRevoked',
      interface: 'checkbox',
      defaultValue: false,
      uiSchema: {
        type: 'boolean',
        title: '{{t("Revoked", { ns: "iu-documents" })}}',
        'x-component': 'Checkbox',
      },
    },
  ],
});
