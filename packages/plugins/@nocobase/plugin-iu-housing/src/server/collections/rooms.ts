import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'rooms',
  title: '{{t("Rooms", { ns: "iu-housing" })}}',
  createdBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'building', target: 'buildings', foreignKey: 'buildingId', interface: 'm2o',
      uiSchema: { title: '{{t("Building", { ns: "iu-housing" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } } },
    },
    {
      type: 'string', name: 'roomNumber', interface: 'input',
      uiSchema: { title: '{{t("Room Number", { ns: "iu-housing" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'integer', name: 'floor', interface: 'number',
      uiSchema: { title: '{{t("Floor", { ns: "iu-housing" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'integer', name: 'capacity', interface: 'number', defaultValue: 2,
      uiSchema: { title: '{{t("Capacity", { ns: "iu-housing" })}}', 'x-component': 'InputNumber', 'x-component-props': { min: 1, max: 6 } },
    },
    {
      type: 'integer', name: 'currentOccupancy', interface: 'number', defaultValue: 0,
      uiSchema: { title: '{{t("Current Occupancy", { ns: "iu-housing" })}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'available',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'available', label: 'متاح', color: 'green' },
          { value: 'full', label: 'ممتلئ', color: 'red' },
          { value: 'maintenance', label: 'صيانة', color: 'orange' },
          { value: 'reserved', label: 'محجوز', color: 'blue' },
        ],
      },
    },
    {
      type: 'json', name: 'amenities', interface: 'json',
      uiSchema: { title: '{{t("Amenities", { ns: "iu-housing" })}}', 'x-component': 'Input.JSON' },
    },
    { type: 'hasMany', name: 'assignments', target: 'housingAssignments', foreignKey: 'roomId' },
    { type: 'hasMany', name: 'maintenanceRequests', target: 'maintenanceRequests', foreignKey: 'roomId' },
  ],
});
