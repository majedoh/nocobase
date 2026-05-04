/**
 * Advising Slots Collection
 * Available appointment slots for academic advisors.
 */
import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'advisingSlots',
  title: '{{t("Advising Slots", { ns: "iu-advising" })}}',
  createdBy: true,
  logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'advisor', target: 'users',
      foreignKey: 'advisorId', interface: 'm2o',
      uiSchema: {
        title: '{{t("Advisor", { ns: "iu-advising" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nickname', value: 'id' } },
      },
    },
    {
      type: 'date', name: 'date', interface: 'datetime',
      uiSchema: {
        title: '{{t("Date", { ns: "iu-advising" })}}',
        'x-component': 'DatePicker',
        'x-component-props': { dateFormat: 'YYYY-MM-DD' },
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'time', name: 'timeStart', interface: 'time',
      uiSchema: {
        title: '{{t("Start Time", { ns: "iu-advising" })}}',
        'x-component': 'TimePicker',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'time', name: 'timeEnd', interface: 'time',
      uiSchema: {
        title: '{{t("End Time", { ns: "iu-advising" })}}',
        'x-component': 'TimePicker',
        'x-validator': [{ required: true }],
      },
    },
    {
      type: 'boolean', name: 'isBooked', interface: 'checkbox',
      defaultValue: false,
      uiSchema: {
        title: '{{t("Booked", { ns: "iu-advising" })}}',
        'x-component': 'Checkbox',
      },
    },
    {
      type: 'belongsTo', name: 'bookedByStudent', target: 'students',
      foreignKey: 'bookedByStudentId', interface: 'm2o',
      uiSchema: {
        title: '{{t("Booked By", { ns: "iu-advising" })}}',
        'x-component': 'AssociationField',
        'x-component-props': { fieldNames: { label: 'nameAr', value: 'id' } },
      },
    },
    {
      type: 'string', name: 'location', interface: 'input',
      uiSchema: {
        title: '{{t("Location", { ns: "iu-advising" })}}',
        'x-component': 'Input',
      },
    },
    {
      type: 'string', name: 'meetingType', interface: 'select',
      defaultValue: 'in_person',
      uiSchema: {
        title: '{{t("Meeting Type", { ns: "iu-advising" })}}',
        'x-component': 'Select',
        enum: [
          { value: 'in_person', label: 'حضوري' },
          { value: 'online', label: 'عن بُعد' },
        ],
      },
    },
  ],
});
