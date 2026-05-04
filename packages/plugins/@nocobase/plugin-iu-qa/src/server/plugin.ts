import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIUQAServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['qaReviews'] } })); }
  async load() { this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['qaReviews:*'] }); this.app.acl.allow('qaReviews', ['list', 'get'], 'loggedIn'); }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('qaReviews'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUQAServer;
