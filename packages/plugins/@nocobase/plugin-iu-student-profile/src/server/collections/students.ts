/**
 * Students Collection Definition
 * Master student record for the IU CRM 360° profile.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'students',
  title: '{{t("Students", { ns: "iu-student-profile" })}}',
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
      type: 'string',
      name: 'universityId',
      interface: 'input',
      unique: true,
      uiSchema: {
        type: 'string',
        title: '{{t("University ID", { ns: "iu-student-profile" })}}',
        'x-component': 'Input',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'string',
      name: 'nameAr',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Name (Arabic)", { ns: "iu-student-profile" })}}',
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
        title: '{{t("Name (English)", { ns: "iu-student-profile" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'nationality',
      interface: 'input',
      uiSchema: {
        type: 'string',
        title: '{{t("Nationality", { ns: "iu-student-profile" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'program',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Program", { ns: "iu-student-profile" })}}',
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
      name: 'college',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("College", { ns: "iu-student-profile" })}}',
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
      type: 'integer',
      name: 'academicLevel',
      interface: 'number',
      uiSchema: {
        type: 'number',
        title: '{{t("Academic Level", { ns: "iu-student-profile" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 1, max: 12 },
      },
    },
    {
      type: 'float',
      name: 'gpa',
      interface: 'number',
      uiSchema: {
        type: 'number',
        title: '{{t("GPA", { ns: "iu-student-profile" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 0, max: 5, step: 0.01, precision: 2 },
      },
    },
    {
      type: 'integer',
      name: 'completedCredits',
      interface: 'number',
      defaultValue: 0,
      uiSchema: {
        type: 'number',
        title: '{{t("Completed Credits", { ns: "iu-student-profile" })}}',
        'x-component': 'InputNumber',
        'x-component-props': { min: 0 },
      },
    },
    {
      type: 'string',
      name: 'status',
      interface: 'select',
      defaultValue: 'active',
      uiSchema: {
        type: 'string',
        title: '{{t("Status", { ns: "iu-student-profile" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'active', label: 'منتظم', color: 'green' },
          { value: 'suspended', label: 'معلق', color: 'orange' },
          { value: 'graduated', label: 'متخرج', color: 'blue' },
          { value: 'withdrawn', label: 'منسحب', color: 'red' },
          { value: 'dismissed', label: 'مفصول', color: 'red' },
          { value: 'on_leave', label: 'مؤجل', color: 'default' },
        ],
      },
    },
    {
      type: 'string',
      name: 'scholarshipType',
      interface: 'select',
      uiSchema: {
        type: 'string',
        title: '{{t("Scholarship Type", { ns: "iu-student-profile" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'full', label: 'منحة كاملة', color: 'gold' },
          { value: 'partial', label: 'منحة جزئية', color: 'cyan' },
          { value: 'self_funded', label: 'على حسابه الخاص', color: 'default' },
          { value: 'none', label: 'بدون منحة', color: 'default' },
        ],
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
        'x-validator': 'email',
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
      name: 'enrollmentDate',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Enrollment Date", { ns: "iu-student-profile" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { dateFormat: 'YYYY-MM-DD' },
      },
    },
    {
      type: 'date',
      name: 'expectedGraduation',
      interface: 'datetime',
      uiSchema: {
        type: 'string',
        title: '{{t("Expected Graduation", { ns: "iu-student-profile" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { dateFormat: 'YYYY-MM-DD' },
      },
    },
    // Relationships
    {
      type: 'belongsTo',
      name: 'advisor',
      target: 'users',
      foreignKey: 'advisorId',
      interface: 'm2o',
      uiSchema: {
        type: 'm2o',
        title: '{{t("Academic Advisor", { ns: "iu-student-profile" })}}',
        'x-component': 'AssociationField',
        'x-component-props': {
          multiple: false,
          fieldNames: { label: 'nickname', value: 'id' },
        },
      },
    },
    {
      type: 'hasMany',
      name: 'notes',
      target: 'studentNotes',
      foreignKey: 'studentId',
    },
    {
      type: 'hasMany',
      name: 'flags',
      target: 'studentFlags',
      foreignKey: 'studentId',
    },
  ],
});
