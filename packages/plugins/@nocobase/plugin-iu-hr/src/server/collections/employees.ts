/**
 * Employee Profiles Collection
 * Extended employee record linked to NocoBase users.
 * Stores HR-specific data not in the base users table.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'employees',
  title: '{{t("Employees", { ns: "iu-hr" })}}',
  sortable: true, createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'user', target: 'users', foreignKey: 'userId', interface: 'm2o', unique: true,
      uiSchema: { title: '{{t("User Account", { ns: "iu-hr" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } } },
    },
    {
      type: 'string', name: 'employeeId', interface: 'input', unique: true,
      uiSchema: { title: '{{t("Employee ID", { ns: "iu-hr" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'nameAr', interface: 'input',
      uiSchema: { title: '{{t("Name (Arabic)", { ns: "iu-hr" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'nameEn', interface: 'input',
      uiSchema: { title: '{{t("Name (English)", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'jobTitle', interface: 'input',
      uiSchema: { title: '{{t("Job Title", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'employeeType', interface: 'select',
      uiSchema: {
        title: '{{t("Employee Type", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'faculty', label: 'عضو هيئة تدريس', color: 'blue' },
          { value: 'admin_staff', label: 'موظف إداري', color: 'green' },
          { value: 'technical', label: 'فني', color: 'cyan' },
          { value: 'contract', label: 'متعاقد', color: 'orange' },
          { value: 'teaching_assistant', label: 'معيد', color: 'purple' },
          { value: 'researcher', label: 'باحث', color: 'gold' },
        ],
      },
    },
    {
      type: 'string', name: 'academicRank', interface: 'select',
      uiSchema: {
        title: '{{t("Academic Rank", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'professor', label: 'أستاذ' },
          { value: 'associate_professor', label: 'أستاذ مشارك' },
          { value: 'assistant_professor', label: 'أستاذ مساعد' },
          { value: 'lecturer', label: 'محاضر' },
          { value: 'teaching_assistant', label: 'معيد' },
          { value: 'na', label: 'غير مطبق' },
        ],
      },
    },
    {
      type: 'belongsTo', name: 'department', target: 'departments', foreignKey: 'departmentId', interface: 'm2o',
      uiSchema: { title: '{{t("Department", { ns: "iu-hr" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'title', value: 'id' } } },
    },
    {
      type: 'date', name: 'joinDate', interface: 'datetime',
      uiSchema: { title: '{{t("Join Date", { ns: "iu-hr" })}}', 'x-component': 'DatePicker' },
    },
    {
      type: 'string', name: 'nationality', interface: 'input',
      uiSchema: { title: '{{t("Nationality", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'phone', interface: 'phone',
      uiSchema: { title: '{{t("Phone", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'emergencyContact', interface: 'input',
      uiSchema: { title: '{{t("Emergency Contact", { ns: "iu-hr" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'active',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-hr" })}}', 'x-component': 'Select',
        enum: [
          { value: 'active', label: 'على رأس العمل', color: 'green' },
          { value: 'on_leave', label: 'في إجازة', color: 'orange' },
          { value: 'sabbatical', label: 'تفرغ علمي', color: 'blue' },
          { value: 'terminated', label: 'منتهي الخدمة', color: 'red' },
          { value: 'retired', label: 'متقاعد', color: 'default' },
        ],
      },
    },
    { type: 'hasMany', name: 'leaveRequests', target: 'leaveRequests', foreignKey: 'employeeId' },
  ],
});
