import extendRouteConstant from './extendRouteConstant'
const routes = [
  {
    ...extendRouteConstant.WELCOME,
    component: () => import('@/pages/welcome/Welcome.vue'),
  },
  {
    ...extendRouteConstant.GEN_PROJECT,
    component: () => import('@/pages/genProject/GenProject.vue'),
  },
  // --------------------
  {
    ...extendRouteConstant.TEST_LAYOUT,
    component: () => import('@/pages/testLayout/TestLayout.vue'),
  },
  {
    ...extendRouteConstant.GEN_ADAPTER,
    component: () => import('@/pages/tool/genAdapter/GenAdapter.vue'),
  },
  {
    ...extendRouteConstant.GEN_SF_PROJECT,
    component: () => import('@/pages/genSoftware/project/Project.vue'),
  },
  {
    ...extendRouteConstant.GEN_PAGE_DESIGN,
    component: () => import('@/pages/genSoftware/pageDesign/PageDesign.vue'),
  },
]


export default routes
