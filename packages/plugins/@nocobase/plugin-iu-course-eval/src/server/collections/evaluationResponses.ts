import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'evaluationResponses',
  title: '{{t("Evaluation Responses", { ns: "iu-course-eval" })}}',
  createdBy: false, logging: true, // anonymous by design
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    { type: 'belongsTo', name: 'period', target: 'evaluationPeriods', foreignKey: 'periodId', interface: 'm2o', uiSchema: { title: '{{t("Period", { ns: "iu-course-eval" })}}', 'x-component': 'AssociationField' } },
    { type: 'string', name: 'courseCode', interface: 'input', uiSchema: { title: '{{t("Course Code", { ns: "iu-course-eval" })}}', 'x-component': 'Input' } },
    { type: 'string', name: 'courseName', interface: 'input', uiSchema: { title: '{{t("Course Name", { ns: "iu-course-eval" })}}', 'x-component': 'Input' } },
    { type: 'string', name: 'instructorName', interface: 'input', uiSchema: { title: '{{t("Instructor", { ns: "iu-course-eval" })}}', 'x-component': 'Input' } },
    { type: 'string', name: 'college', interface: 'select', uiSchema: { title: '{{t("College", { ns: "iu-course-eval" })}}', 'x-component': 'Select', enum: [
      { value: 'sharia', label: 'كلية الشريعة' }, { value: 'dawah', label: 'كلية الدعوة' }, { value: 'quran', label: 'كلية القرآن' },
      { value: 'hadith', label: 'كلية الحديث' }, { value: 'arabic', label: 'كلية اللغة العربية' },
      { value: 'engineering', label: 'كلية الهندسة' }, { value: 'science', label: 'كلية العلوم' }, { value: 'cs', label: 'كلية الحاسب' },
    ] } },
    { type: 'integer', name: 'teachingQuality', interface: 'number', uiSchema: { title: '{{t("Teaching Quality (1-5)", { ns: "iu-course-eval" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } } },
    { type: 'integer', name: 'courseContent', interface: 'number', uiSchema: { title: '{{t("Course Content (1-5)", { ns: "iu-course-eval" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } } },
    { type: 'integer', name: 'assessmentFairness', interface: 'number', uiSchema: { title: '{{t("Assessment Fairness (1-5)", { ns: "iu-course-eval" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } } },
    { type: 'integer', name: 'learningEnvironment', interface: 'number', uiSchema: { title: '{{t("Learning Environment (1-5)", { ns: "iu-course-eval" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } } },
    { type: 'integer', name: 'overallRating', interface: 'number', uiSchema: { title: '{{t("Overall Rating (1-5)", { ns: "iu-course-eval" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 5 } } },
    { type: 'text', name: 'strengths', interface: 'textarea', uiSchema: { title: '{{t("Strengths", { ns: "iu-course-eval" })}}', 'x-component': 'Input.TextArea' } },
    { type: 'text', name: 'improvements', interface: 'textarea', uiSchema: { title: '{{t("Suggested Improvements", { ns: "iu-course-eval" })}}', 'x-component': 'Input.TextArea' } },
  ],
});
