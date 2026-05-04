/**
 * Admission Decisions Collection
 * Records every decision point in the pipeline for audit trail.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'admissionDecisions',
  title: '{{t("Admission Decisions", { ns: "iu-admissions" })}}',
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
      type: 'string', name: 'stage', interface: 'select',
      uiSchema: {
        title: '{{t("Decision Stage", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'document_review', label: 'مراجعة الوثائق' },
          { value: 'committee_review', label: 'مراجعة اللجنة' },
          { value: 'final_decision', label: 'القرار النهائي' },
          { value: 'scholarship_decision', label: 'قرار المنحة' },
        ],
      },
    },
    {
      type: 'string', name: 'decision', interface: 'select',
      uiSchema: {
        title: '{{t("Decision", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'approved', label: 'مقبول', color: 'success' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'deferred', label: 'مؤجل', color: 'warning' },
          { value: 'waitlisted', label: 'قائمة انتظار', color: 'orange' },
        ],
      },
    },
    {
      type: 'text', name: 'reason', interface: 'textarea',
      uiSchema: {
        title: '{{t("Reason", { ns: "iu-admissions" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'belongsTo', name: 'decidedBy', target: 'users',
      foreignKey: 'decidedById', interface: 'm2o',
      uiSchema: {
        title: '{{t("Decided By", { ns: "iu-admissions" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } },
      },
    },
  ],
});
