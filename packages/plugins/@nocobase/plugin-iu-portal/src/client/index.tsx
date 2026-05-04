import { Plugin } from '@nocobase/client';

export class PluginIUPortalClient extends Plugin {
  async load() {
    // Inject IU custom CSS (theme colors + Arabic font)
    const style = document.createElement('style');
    style.textContent = `
      /* IU Brand Theme */
      :root {
        --iu-green: #006633;
        --iu-gold: #C4A000;
        --iu-dark: #1a1a2e;
      }

      /* Arabic typography */
      @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');

      body, .ant-layout, .ant-menu, .ant-table, .ant-form,
      .ant-card, .ant-modal, .ant-drawer, .ant-select,
      .ant-input, .ant-btn, .nb-action-title {
        font-family: 'Almarai', 'Segoe UI', Tahoma, Arial, sans-serif !important;
      }

      /* Sidebar branding */
      .ant-layout-sider {
        background: linear-gradient(180deg, var(--iu-dark) 0%, #16213e 100%) !important;
      }

      .ant-layout-sider .ant-menu {
        background: transparent !important;
      }

      .ant-layout-sider .ant-menu-item-selected {
        background: rgba(0, 102, 51, 0.3) !important;
        border-right: 3px solid var(--iu-green) !important;
      }

      /* Primary button override */
      .ant-btn-primary {
        background: var(--iu-green) !important;
        border-color: var(--iu-green) !important;
      }

      .ant-btn-primary:hover {
        background: #008844 !important;
        border-color: #008844 !important;
      }

      /* Table header */
      .ant-table-thead > tr > th {
        background: #f0f7f4 !important;
        font-weight: 700 !important;
      }

      /* Status tag colors */
      .ant-tag-green { background: #e6f7e6 !important; color: var(--iu-green) !important; border-color: var(--iu-green) !important; }
      .ant-tag-gold { background: #fffbe6 !important; color: var(--iu-gold) !important; border-color: var(--iu-gold) !important; }

      /* RTL micro-adjustments */
      [dir="rtl"] .ant-table-cell { text-align: right; }
      [dir="rtl"] .ant-form-item-label { text-align: right; }
    `;
    document.head.appendChild(style);
  }
}

export default PluginIUPortalClient;
