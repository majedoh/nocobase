import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIUCareerServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['jobListings'] } })); }
  async load() { this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['jobListings:*'] }); this.app.acl.allow('jobListings', ['list', 'get'], 'loggedIn'); }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('jobListings'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUCareerServer;
