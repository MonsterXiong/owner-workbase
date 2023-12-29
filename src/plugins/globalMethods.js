import emitter from '@/utils/eventBus'
import tools from './globalMethods/tools/tool'
// import { znTool } from 'zn-ui'
// import configData from '@/utils/config'
// import enumStore from '@/store/enum.js'
/**
 * 注册全局方法
 * @param Vue
 */
export function setupGlobalMethods(Vue) {
  Vue.prototype.$emitter = emitter
  Vue.prototype.$tools = tools
  // Vue.prototype.$znTool = znTool
  // Vue.prototype.$configData = configData
  // Vue.prototype.getAllEnum = enumStore.getAllEnum
  // Vue.prototype.getEnumByCode = enumStore.getEnumByCode
  // Vue.prototype.getEnumMeaning = enumStore.getEnumMeaning
}
