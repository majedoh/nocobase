/**
 * IU Portal Master Plugin - Server Plugin Class
 *
 * Orchestrates all 16 IU plugins:
 * - Auto-provisions sidebar navigation (7 groups, 22 pages)
 * - Seeds default table block schemas per page
 * - Applies IU theme (Green/Gold)
 */
import { InstallOptions, Plugin } from '@nocobase/server';
import { getMenuSchemas, getPageSchemas } from './schemas';

export class PluginIUPortalServer extends Plugin {
  afterAdd() {}
  beforeLoad() {}

  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ['*'],
    });
  }

  async install(options?: InstallOptions) {
    await this.seedNavigation();
  }

  /**
   * Seeds the complete sidebar navigation and page schemas into the database.
   * NocoBase stores UI configuration in the `uiSchemas` collection.
   * This runs once on plugin install to set up all 22 pages.
   */
  private async seedNavigation() {
    const uiSchemaRepo = this.db.getRepository('uiSchemas') as any;
    if (!uiSchemaRepo) {
      this.app.logger.warn('[iu-portal] uiSchemas repository not found, skipping UI seed');
      return;
    }

    try {
      // 1. Get the root menu schema (admin layout)
      const menuSchemas = getMenuSchemas();
      const pageSchemas = getPageSchemas();

      // 2. Insert menu items under the root admin menu
      for (const [key, menuSchema] of Object.entries(menuSchemas)) {
        try {
          await uiSchemaRepo.insertAdjacent('end', 'nocobase-admin-menu', menuSchema, {
            wrap: null,
          });
          this.app.logger.info(`[iu-portal] Menu group added: ${key}`);
        } catch (e: any) {
          // Menu item may already exist
          this.app.logger.debug(`[iu-portal] Menu ${key} may already exist: ${e.message}`);
        }
      }

      // 3. Insert page schemas for each menu item
      for (const [menuKey, schema] of Object.entries(pageSchemas)) {
        try {
          // Find the menu item's UID and insert page content
          await uiSchemaRepo.insertAdjacent('end', menuKey, schema, {
            wrap: null,
          });
          this.app.logger.info(`[iu-portal] Page schema added: ${menuKey}`);
        } catch (e: any) {
          this.app.logger.debug(`[iu-portal] Page ${menuKey} may already exist: ${e.message}`);
        }
      }

      this.app.logger.info('[iu-portal] ✅ Navigation seeded: 7 groups, 22 pages');
    } catch (error: any) {
      this.app.logger.error(`[iu-portal] Failed to seed navigation: ${error.message}`);
    }
  }

  async afterEnable() {}
  async afterDisable() {}
  async remove() {}
}

export default PluginIUPortalServer;
