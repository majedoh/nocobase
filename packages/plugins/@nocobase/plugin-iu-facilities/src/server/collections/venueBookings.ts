import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'venueBookings',
  title: '{{t("Venue Bookings", { ns: "iu-facilities" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'sequence', name: 'bookingNumber', interface: 'sequence',
      patterns: [
        { type: 'string', options: { value: 'BK' } },
        { type: 'date', options: { format: 'YYYYMM' } },
        { type: 'integer', options: { digits: 4, start: 1, key: 'booking' } },
      ],
      uiSchema: { title: '{{t("Booking Number", { ns: "iu-facilities" })}}', 'x-component': 'Input', 'x-read-pretty': true },
    },
    {
      type: 'belongsTo', name: 'venue', target: 'venues', foreignKey: 'venueId', interface: 'm2o',
      uiSchema: { title: '{{t("Venue", { ns: "iu-facilities" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'eventTitle', interface: 'input',
      uiSchema: { title: '{{t("Event Title", { ns: "iu-facilities" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'date', name: 'date', interface: 'datetime',
      uiSchema: { title: '{{t("Date", { ns: "iu-facilities" })}}', 'x-component': 'DatePicker', 'x-validator': [{ required: true }] },
    },
    {
      type: 'time', name: 'timeStart', interface: 'time',
      uiSchema: { title: '{{t("Start Time", { ns: "iu-facilities" })}}', 'x-component': 'TimePicker' },
    },
    {
      type: 'time', name: 'timeEnd', interface: 'time',
      uiSchema: { title: '{{t("End Time", { ns: "iu-facilities" })}}', 'x-component': 'TimePicker' },
    },
    {
      type: 'integer', name: 'expectedAttendees', interface: 'number',
      uiSchema: { title: '{{t("Expected Attendees", { ns: "iu-facilities" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'text', name: 'specialRequirements', interface: 'textarea',
      uiSchema: { title: '{{t("Special Requirements", { ns: "iu-facilities" })}}', 'x-component': 'Input.TextArea' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'pending',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-facilities" })}}', 'x-component': 'Select',
        enum: [
          { value: 'pending', label: 'قيد الانتظار', color: 'default' },
          { value: 'confirmed', label: 'مؤكد', color: 'success' },
          { value: 'cancelled', label: 'ملغى', color: 'error' },
          { value: 'completed', label: 'مكتمل', color: 'cyan' },
        ],
      },
    },
  ],
});
