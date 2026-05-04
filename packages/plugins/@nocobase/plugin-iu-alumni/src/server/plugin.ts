import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIUAlumniServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['alumni'] } })); }
  async load() { this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['alumni:*'] }); this.app.acl.allow('alumni', ['list', 'get'], 'loggedIn'); }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('alumni'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUAlumniServer;
