import { setupElement } from './element-ui';
import { setupAssets } from './assets';
import { setupDirectives } from './directives';
import { setupGlobalComponents } from './globalComponents';
import { setupGlobalMethods } from './globalMethods';
function setupPlugins(app){
  setupAssets(app)
  setupElement(app)
  setupDirectives(app)
  setupGlobalComponents(app)
  setupGlobalMethods(app)
}

export default setupPlugins
