/**
 * Document Requests Collection
 * Student/employee requests for official university documents.
 * Drives the approval workflow pipeline.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'documentRequests',
  title: '{{t("Document Requests", { ns: "iu-documents" })}}',
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
      type: 'sequence',
      name: 'requestNumber',
      interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'DOC' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 5, start: 1, key: 'docreq' } },
      ],
      uiSchema: {
        type: 'string',
        title: '{{t("Request Number", { ns: "iu-documents" })}}',
        'x-component': 'Input',
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
        title: '{{t("Student", { ns: "iu-documents" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nameAr', value: 'id' },
        },
      },
    },
    {
      type: 'belongsTo',
      name: 'template',
      target: 'documentTemplates',
      foreignKey: 'templateId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Document Template", { ns: "iu-documents" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nameAr', value: 'id' },
        },
      },
    },
    {
      type: 'string',
      name: 'status',
      interface: 'select',
      defaultValue: 'pending',
      uiSchema: {
        type: 'string',
        title: '{{t("Status", { ns: "iu-documents" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'قيد الانتظار', color: 'default' },
          { value: 'processing', label: 'قيد المعالجة', color: 'processing' },
          { value: 'approved', label: 'معتمد', color: 'success' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'delivered', label: 'تم التسليم', color: 'cyan' },
        ],
      },
    },
    {
      type: 'text',
      name: 'purpose',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Purpose", { ns: "iu-documents" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'integer',
      name: 'copies',
      interface: 'number',
      defaultValue: 1,
      uiSchema: {
        type: 'number',
        title: '{{t("Number of Copies", { ns: "iu-documents" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 1, max: 10 },
      },
    },
    {
      type: 'string',
      name: 'language',
      interface: 'select',
      defaultValue: 'arabic',
      uiSchema: {
        type: 'string',
        title: '{{t("Document Language", { ns: "iu-documents" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'arabic', label: 'عربي' },
          { value: 'english', label: 'إنجليزي' },
          { value: 'both', label: 'عربي وإنجليزي' },
        ],
      },
    },
    {
      type: 'belongsTo',
      name: 'approver',
      target: 'users',
      foreignKey: 'approverId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Approver", { ns: "iu-documents" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nickname', value: 'id' },
        },
      },
    },
    {
      type: 'text',
      name: 'rejectionReason',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Rejection Reason", { ns: "iu-documents" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 2 },
      },
    },
    {
      type: 'date',
      name: 'processedAt',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Processed At", { ns: "iu-documents" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { showTime: true },
      },
    },
  ],
});
