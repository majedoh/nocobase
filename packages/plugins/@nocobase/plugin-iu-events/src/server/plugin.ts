import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIUEventsServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['campusEvents'] } })); }
  async load() { this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['campusEvents:*'] }); this.app.acl.allow('campusEvents', ['list', 'get'], 'loggedIn'); }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('campusEvents'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUEventsServer;
