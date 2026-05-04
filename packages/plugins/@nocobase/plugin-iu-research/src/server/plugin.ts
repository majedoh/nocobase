import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIUResearchServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['researchGrants'] } })); }
  async load() {
    this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['researchGrants:*'] });
    this.app.acl.allow('researchGrants', ['list', 'get', 'create'], 'loggedIn');
    this.app.db.on('researchGrants.afterUpdate', async (model: any) => {
      const prev = model.previous('status'); const curr = model.get('status');
      if (prev !== curr) this.app.logger.info(`[iu-research] Grant ${model.get('grantNumber')}: ${prev} → ${curr} | Budget: ${model.get('budgetApproved') || model.get('budgetRequested')} SAR`);
    });
  }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('researchGrants'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUResearchServer;
