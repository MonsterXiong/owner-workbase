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
    redirect:routesConstant.WELCOME.path,
    // redirect:'/fe',
    component: BaseLayout,
    children:[...baseRoutes,...routes,]
  },
  {
    path:'/fe',
    component: () => import('@/pages/nav/index.vue')
  },
]

const router = new VueRouter({
  routes:currentRoutes
})

export default router
