import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'knowledgeBase',
  title: '{{t("Knowledge Base", { ns: "iu-helpdesk" })}}',
  createdBy: true, updatedBy: true, logging: true,
  fields: [
    { type: 'snowflakeId', name: 'id', primaryKey: true },
    {
      type: 'string', name: 'titleAr', interface: 'input',
      uiSchema: { title: '{{t("Title (Arabic)", { ns: "iu-helpdesk" })}}', 'x-component': 'Input', 'x-validator': [{ required: true }] },
    },
    {
      type: 'string', name: 'titleEn', interface: 'input',
      uiSchema: { title: '{{t("Title (English)", { ns: "iu-helpdesk" })}}', 'x-component': 'Input' },
    },
    {
      type: 'string', name: 'category', interface: 'select',
      uiSchema: {
        title: '{{t("Category", { ns: "iu-helpdesk" })}}', 'x-component': 'Select',
        enum: [
          { value: 'how_to', label: 'كيف أفعل' },
          { value: 'faq', label: 'أسئلة شائعة' },
          { value: 'troubleshooting', label: 'حل مشكلات' },
          { value: 'policy', label: 'سياسات ولوائح' },
        ],
      },
    },
    {
      type: 'text', name: 'content', interface: 'markdown',
      uiSchema: { title: '{{t("Content", { ns: "iu-helpdesk" })}}', 'x-component': 'Markdown' },
    },
    {
      type: 'boolean', name: 'published', interface: 'checkbox', defaultValue: false,
      uiSchema: { title: '{{t("Published", { ns: "iu-helpdesk" })}}', 'x-component': 'Checkbox' },
    },
    {
      type: 'integer', name: 'viewCount', interface: 'number', defaultValue: 0,
      uiSchema: { title: '{{t("View Count", { ns: "iu-helpdesk" })}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
    },
    {
      type: 'integer', name: 'helpfulCount', interface: 'number', defaultValue: 0,
      uiSchema: { title: '{{t("Helpful Count", { ns: "iu-helpdesk" })}}', 'x-component': 'InputNumber', 'x-read-pretty': true },
    },
  ],
});
