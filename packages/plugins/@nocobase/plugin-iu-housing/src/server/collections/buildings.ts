import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'buildings',
  title: '{{t("Buildings", { ns: "iu-housing" })}}',
  createdBy: true, updatedBy: true, logging: true, sortable: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'string', name: 'nameAr', interface: 'input',
      uiSchema: { title: '{{t("Building Name (Arabic)", { ns: "iu-housing" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'nameEn', interface: 'input',
      uiSchema: { title: '{{t("Building Name (English)", { ns: "iu-housing" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'gender', interface: 'select',
      uiSchema: {
        title: '{{t("Gender", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [{ value: 'male', label: 'ذكور' }, { value: 'female', label: 'إناث' }],
      },
    },
    {
      type: 'integer', name: 'totalRooms', interface: 'number',
      uiSchema: { title: '{{t("Total Rooms", { ns: "iu-housing" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'integer', name: 'floors', interface: 'number',
      uiSchema: { title: '{{t("Number of Floors", { ns: "iu-housing" })}}', 'x-component': 'InputNumber' },
    },
    {
      type: 'string', name: 'location', interface: 'input',
      uiSchema: { title: '{{t("Location", { ns: "iu-housing" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'status', interface: 'select', defaultValue: 'active',
      uiSchema: {
        title: '{{t("Status", { ns: "iu-housing" })}}', 'x-component': 'Select',
        enum: [
          { value: 'active', label: 'نشط', color: 'green' },
          { value: 'maintenance', label: 'صيانة', color: 'orange' },
          { value: 'closed', label: 'مغلق', color: 'red' },
        ],
      },
    },
    { type: 'hasMany', name: 'rooms', target: 'rooms', foreignKey: 'buildingId' },
  ],
});
