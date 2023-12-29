import globalComponents from '@/baseComponents'
/**
 * 全局注册自定义组件
 * @param Vue
 */
export function setupGlobalComponents(Vue) {
    Object.keys(globalComponents).forEach(key => {
      Vue.component(key, globalComponents[key]);
    });
}
