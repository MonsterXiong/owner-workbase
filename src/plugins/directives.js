
import dragdialog from '@/directives/dragDialog/dragdialog.js'

/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives(Vue) {
  Vue.use(dragdialog)
}
