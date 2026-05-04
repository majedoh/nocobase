/**
 * Applicants Collection
 * Master record for prospective students in the admissions pipeline.
 * Tracks an applicant from initial application through enrollment.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'applicants',
  title: '{{t("Applicants", { ns: "iu-admissions" })}}',
  sortable: true,
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
      name: 'applicationNumber',
      interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'APP' } },
        { type: 'date', options: { format: 'YYYY' } },
        { type: 'integer', options: { digits: 6, start: 1, key: 'applicant' } },
      ],
      uiSchema: {
        type: 'string',
        title: '{{t("Application Number", { ns: "iu-admissions" })}}',
        'x-component': 'Input',
        'x-read-pretty': true,
      },
    },
    {
      type: 'string',
      name: 'nameAr',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Name (Arabic)", { ns: "iu-admissions" })}}',
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
        title: '{{t("Name (English)", { ns: "iu-admissions" })}}',
        'x-component': 'Input',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'email',
      interface: 'email',
      uiSchema: {
        type: 'string',
        title: '{{t("Email")}}',
        'x-component': 'Input',
        'x-validator': ['email', { required: true }],
      },
    },
    {
      type: 'string',
      name: 'phone',
      interface: 'phone',
      uiSchema: {
        type: 'string',
        title: '{{t("Phone")}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'date',
      name: 'dateOfBirth',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Date of Birth", { ns: "iu-admissions" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { dateFormat: 'YYYY-MM-DD' },
      },
    },
    {
      type: 'string',
      name: 'nationality',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Nationality", { ns: "iu-admissions" })}}',
        'x-component': 'Input',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'countryOfResidence',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Country of Residence", { ns: "iu-admissions" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'passportNumber',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Passport Number", { ns: "iu-admissions" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'desiredProgram',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Desired Program", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'bachelors', label: 'بكالوريوس', color: 'blue' },
          { value: 'masters', label: 'ماجستير', color: 'purple' },
          { value: 'phd', label: 'دكتوراه', color: 'gold' },
          { value: 'diploma', label: 'دبلوم', color: 'cyan' },
          { value: 'arabic_institute', label: 'معهد تعليم اللغة العربية', color: 'green' },
        ],
      },
    },
    {
      type: 'string',
      name: 'desiredCollege',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Desired College", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'sharia', label: 'كلية الشريعة' },
          { value: 'dawah', label: 'كلية الدعوة وأصول الدين' },
          { value: 'quran', label: 'كلية القرآن الكريم' },
          { value: 'hadith', label: 'كلية الحديث الشريف' },
          { value: 'arabic', label: 'كلية اللغة العربية' },
          { value: 'engineering', label: 'كلية الهندسة' },
          { value: 'science', label: 'كلية العلوم' },
          { value: 'cs', label: 'كلية الحاسب الآلي' },
        ],
      },
    },
    {
      type: 'float',
      name: 'highSchoolGpa',
      interface: 'number',
      uiSchema: {
        type: 'number',
        title: '{{t("High School GPA", { ns: "iu-admissions" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 0, max: 100, step: 0.01 },
      },
    },
    {
      type: 'string',
      name: 'scholarshipRequested',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Scholarship Requested", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'full', label: 'منحة كاملة', color: 'gold' },
          { value: 'partial', label: 'منحة جزئية', color: 'cyan' },
          { value: 'none', label: 'بدون منحة', color: 'default' },
        ],
      },
    },
    {
      type: 'string',
      name: 'pipelineStage',
      interface: 'select',
      defaultValue: 'applied',
      uiSchema: {
        type: 'string',
        title: '{{t("Pipeline Stage", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'applied', label: 'تم التقديم', color: 'default' },
          { value: 'document_review', label: 'مراجعة الوثائق', color: 'processing' },
          { value: 'committee_review', label: 'مراجعة اللجنة', color: 'warning' },
          { value: 'accepted', label: 'مقبول', color: 'success' },
          { value: 'rejected', label: 'مرفوض', color: 'error' },
          { value: 'visa_processing', label: 'إجراءات التأشيرة', color: 'purple' },
          { value: 'travel', label: 'السفر', color: 'cyan' },
          { value: 'arrived', label: 'وصل', color: 'blue' },
          { value: 'enrolled', label: 'مسجل', color: 'green' },
          { value: 'waitlisted', label: 'قائمة الانتظار', color: 'orange' },
        ],
      },
    },
    {
      type: 'integer',
      name: 'committeeScore',
      interface: 'number',
      uiSchema: {
        type: 'number',
        title: '{{t("Committee Score", { ns: "iu-admissions" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 0, max: 100 },
      },
    },
    {
      type: 'text',
      name: 'committeeNotes',
      interface: 'textarea',
      uiSchema: {
        type: 'string',
        title: '{{t("Committee Notes", { ns: "iu-admissions" })}}',
        'x-component': 'Input.TextArea',
        'x-component-props': { rows: 3 },
      },
    },
    {
      type: 'string',
      name: 'visaStatus',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Visa Status", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'not_required', label: 'غير مطلوب' },
          { value: 'pending', label: 'قيد الإصدار', color: 'processing' },
          { value: 'issued', label: 'صدرت', color: 'success' },
          { value: 'denied', label: 'رُفضت', color: 'error' },
        ],
      },
    },
    {
      type: 'belongsTo',
      name: 'assignedOfficer',
      target: 'users',
      foreignKey: 'assignedOfficerId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Assigned Officer", { ns: "iu-admissions" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nickname', value: 'id' },
        },
      },
    },
    {
      type: 'string',
      name: 'admissionSemester',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Admission Semester", { ns: "iu-admissions" })}}',
        'x-component': 'Select',
        enum: [
          { value: '1447_1', label: '1447/1 - الفصل الأول' },
          { value: '1447_2', label: '1447/2 - الفصل الثاني' },
          { value: '1448_1', label: '1448/1 - الفصل الأول' },
          { value: '1448_2', label: '1448/2 - الفصل الثاني' },
        ],
      },
    },
    {
      type: 'hasMany',
      name: 'documents',
      target: 'applicantDocuments',
      foreignKey: 'applicantId',
    },
    {
      type: 'hasMany',
      name: 'decisions',
      target: 'admissionDecisions',
      foreignKey: 'applicantId',
    },
  ],
});
