/**
 * IU Document Management Plugin - Client Entry
 * Registers the plugin on the client side for UI integration.
 */

import { Plugin } from '@nocobase/client';

export class PluginIUDocumentsClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    // Client-side extensions can be added here:
    // - Custom document preview component
    // - Template variable editor
    // - Document status timeline widget
  }
}

export default PluginIUDocumentsClient;
