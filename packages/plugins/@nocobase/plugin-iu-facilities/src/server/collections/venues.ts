import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'venues',
  title: '{{t("Venues", { ns: "iu-facilities" })}}',
  createdBy: true, updatedBy: true, logging: true, sortable: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'string', name: 'nameAr', interface: 'input',
      uiSchema: { title: '{{t("Venue Name (Arabic)", { ns: "iu-facilities" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'nameEn', interface: 'input',
      uiSchema: { title: '{{t("Venue Name (English)", { ns: "iu-facilities" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'venueType', interface: 'select',
      uiSchema: {
        title: '{{t("Venue Type", { ns: "iu-facilities" })}}', 'x-component': 'Select',
        enum: [
          { value: 'lecture_hall', label: 'قاعة محاضرات', color: 'blue' },
          { value: 'meeting_room', label: 'قاعة اجتماعات', color: 'green' },
          { value: 'lab', label: 'مختبر', color: 'purple' },
          { value: 'auditorium', label: 'مسرح/قاعة كبرى', color: 'gold' },
          { value: 'mosque', label: 'مصلى', color: 'cyan' },
          { value: 'sports', label: 'صالة رياضية', color: 'orange' },
          { value: 'open_space', label: 'ساحة مفتوحة', color: 'lime' },
        ],
      },
    },
    {
      type: 'string', name: 'location', interface: 'input',
      uiSchema: { title: '{{t("Location", { ns: "iu-facilities" })}}', 'x-component': 'Input' },
    },
    {
      type: 'integer', name: 'capacity', interface: 'number',
      uiSchema: { title: '{{t("Capacity", { ns: "iu-facilities" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1 } },
    },
    {
      type: 'json', name: 'equipment', interface: 'json',
      uiSchema: { title: '{{t("Equipment", { ns: "iu-facilities" })}}', 'x-component': 'Input.JSON' },
    },
    {
      type: 'boolean', name: 'available', interface: 'checkbox', defaultValue: true,
      uiSchema: { title: '{{t("Available", { ns: "iu-facilities" })}}', 'x-component': 'Checkbox' },
    },
    { type: 'hasMany', name: 'bookings', target: 'venueBookings', foreignKey: 'venueId' },
  ],
});
