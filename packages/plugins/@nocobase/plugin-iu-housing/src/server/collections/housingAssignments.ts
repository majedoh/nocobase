import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'housingAssignments',
  title: '{{t("Housing Assignments", { ns: "iu-housing" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'student', target: 'students', foreignKey: 'studentId', interface: 'm2o',
      uiSchema: { title: '{{t("Student", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'belongsTo', name: 'room', target: 'rooms', foreignKey: 'roomId', interface: 'm2o',
      uiSchema: { title: '{{t("Room", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'roomNumber', value: 'id' } } },
    },
    {
      type: 'string', name: 'semester', interface: 'input',
      uiSchema: { title: '{{t("Semester", { ns: "iu-housing" })}}', 'x-component': 'Input' },
    },
    {
      type: 'date', name: 'checkInDate', interface: 'datetime',
      uiSchema: { title: '{{t("Check-in Date", { ns: "iu-housing" })}}', 'x-component': 'DatePicker' },
    },
    {
      type: 'date', name: 'checkOutDate', interface: 'datetime',
      uiSchema: { title: '{{t("Check-out Date", { ns: "iu-housing" })}}', 'x-component': 'DatePicker' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'pending',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'قيد الانتظار', color: 'default' },
          { value: 'assigned', label: 'تم التعيين', color: 'processing' },
          { value: 'checked_in', label: 'تم الدخول', color: 'success' },
          { value: 'checked_out', label: 'تم الخروج', color: 'cyan' },
          { value: 'cancelled', label: 'ملغى', color: 'error' },
        ],
      },
    },
    {
      type: 'text', name: 'specialNeeds', interface: 'textarea',
      uiSchema: { title: '{{t("Special Needs", { ns: "iu-housing" })}}', 'x-component': 'Input.TextArea' },
    },
  ],
});
