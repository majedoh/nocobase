import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'ticketReplies',
  title: '{{t("Ticket Replies", { ns: "iu-helpdesk" })}}',
  createdBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'belongsTo', name: 'ticket', target: 'supportTickets', foreignKey: 'ticketId', interface: 'm2o',
      uiSchema: { title: '{{t("Ticket", { ns: "iu-helpdesk" })}}', 'x-component': 'AssociationField', 'x-component-props': { fieldNames: { label: 'ticketNumber', value: 'id' } } },
    },
    {
      type: 'text', name: 'content', interface: 'markdown',
      uiSchema: { title: '{{t("Reply Content", { ns: "iu-helpdesk" })}}', 'x-component': 'Markdown', 'x-validator': [{ required: true }] },
    },
    {
      type: 'boolean', name: 'isInternal', interface: 'checkbox', defaultValue: false,
      uiSchema: { title: '{{t("Internal Note", { ns: "iu-helpdesk" })}}', 'x-component': 'Checkbox' },
    },
    {
      type: 'string', name: 'replyType', interface: 'select', defaultValue: 'reply',
      uiSchema: {
        title: '{{t("Reply Type", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'reply', label: 'رد' },
          { value: 'note', label: 'ملاحظة داخلية' },
          { value: 'status_change', label: 'تغيير حالة' },
          { value: 'assignment', label: 'إعادة تعيين' },
        ],
      },
    },
  ],
});
