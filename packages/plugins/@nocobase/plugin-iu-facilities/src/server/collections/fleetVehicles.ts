import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'fleetVehicles',
  title: '{{t("Fleet Vehicles", { ns: "iu-facilities" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'string', name: 'plateNumber', interface: 'input', unique: true,
      uiSchema: { title: '{{t("Plate Number", { ns: "iu-facilities" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'vehicleType', interface: 'select',
      uiSchema: {
        title: '{{t("Vehicle Type", { ns: "iu-facilities" })}}', 'x-component': 'Select',
        enum: [
          { value: 'sedan', label: 'سيدان' },
          { value: 'suv', label: 'جيب' },
          { value: 'van', label: 'فان' },
          { value: 'bus', label: 'حافلة' },
          { value: 'truck', label: 'شاحنة' },
        ],
      },
    },
    {
      type: 'string', name: 'make', interface: 'input',
      uiSchema: { title: '{{t("Make/Model", { ns: "iu-facilities" })}}', 'x-component': 'Input' },
    },
    {
      type: 'integer', name: 'year', interface: 'number',
      uiSchema: { title: '{{t("Year", { ns: "iu-facilities" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'integer', name: 'mileage', interface: 'number', defaultValue: 0,
      uiSchema: { title: '{{t("Mileage (km)", { ns: "iu-facilities" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'available',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-facilities" })}}', 'x-component': 'Select',
        enum: [
          { value: 'available', label: 'متاح', color: 'green' },
          { value: 'in_use', label: 'قيد الاستخدام', color: 'processing' },
          { value: 'maintenance', label: 'صيانة', color: 'orange' },
          { value: 'retired', label: 'خارج الخدمة', color: 'default' },
        ],
      },
    },
    {
      type: 'date', name: 'nextServiceDate', interface: 'datetime',
      uiSchema: { title: '{{t("Next Service Date", { ns: "iu-facilities" })}}', 'x-component': 'DatePicker' },
    },
    {
      type: 'string', name: 'assignedDriver', interface: 'input',
      uiSchema: { title: '{{t("Assigned Driver", { ns: "iu-facilities" })}}', 'x-component': 'Input' },
    },
  ],
});
