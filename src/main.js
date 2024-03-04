import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupPlugins from '@/plugins'
import configData from '@/utils/config'
import _ from 'lodash'

setupPlugins(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

window._ = _
