import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginIUCourseEvalServer extends Plugin {
  afterAdd() {}
  beforeLoad() {
    this.app.acl.addFixedParams('collections', 'destroy', () => ({ filter: { 'name.$notIn': ['evaluationPeriods', 'evaluationResponses'] } }));
  }
  async load() {
    this.app.acl.registerSnippet({ name: `pm.${this.name}`, actions: ['evaluationPeriods:*', 'evaluationResponses:*'] });
    this.app.acl.allow('evaluationResponses', ['create'], 'loggedIn');
    this.app.acl.allow('evaluationPeriods', ['list', 'get'], 'loggedIn');
    // Auto-calculate overall if not set
    this.app.db.on('evaluationResponses.beforeCreate', async (model: any) => {
      if (!model.get('overallRating')) {
        const dims = [model.get('teachingQuality'), model.get('courseContent'), model.get('assessmentFairness'), model.get('learningEnvironment')].filter(Boolean);
        if (dims.length > 0) model.set('overallRating', Math.round(dims.reduce((a: number, b: number) => a + b, 0) / dims.length));
      }
    });
  }
  async install(options?: InstallOptions) {
    const r = this.db.getRepository<any>('collections');
    if (r) { await r.db2cm('evaluationPeriods'); await r.db2cm('evaluationResponses'); }
  }
  async afterEnable() {} async afterDisable() {} async remove() {}
}
export default PluginIUCourseEvalServer;
