import { InstallOptions, Plugin } from '@nocobase/server';
export class PluginIULibraryServer extends Plugin {
  afterAdd() {} beforeLoad() { this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['libraryItems'] } })); }
  async load() { this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['libraryItems:*'] }); this.app.acl.allow('libraryItems', ['list', 'get'], 'loggedIn'); }
  async install() { const r = this.db.getRepository<any>('collections'); if (r) await r.db2cm('libraryItems'); }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIULibraryServer;
