import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './extend/extendRoutes'
import baseRoutes from './base/baseRoutes'
import routesConstant from './routesConstant'
import BaseLayout from '@/layout/baseLayout/BaseLayout.vue'

Vue.use(VueRouter)

const currentRoutes = [
  {
    path:routesConstant.HOME.path,
    redirect:routesConstant.GEN_ADAPTER.path,
    component: BaseLayout,
    children:[...baseRoutes,...routes,]
  },
  {
    ...routesConstant.GEN_CODE,
    component: () => import('@/pages/tool/genCode/GenCode.vue'),
  },
]

const router = new VueRouter({
  routes:currentRoutes
})

export default router
