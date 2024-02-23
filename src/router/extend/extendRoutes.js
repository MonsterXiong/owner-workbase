import extendRouteConstant from './extendRouteConstant'
const routes = [

  {
    ...extendRouteConstant.WELCOME,
    component: () => import('@/pages/welcome/Welcome.vue'),
  },
  {
    ...extendRouteConstant.OFFLINE_DOC,
    component: () => import('@/pages/offlineDoc/OfflineDoc.vue'),
  },
  {
    ...extendRouteConstant.GEN_PROJECT,
    component: () => import('@/pages/genProject/GenProject.vue'),
  },
  {
    ...extendRouteConstant.GEN_PAGE,
    component: () => import('@/pages/genPage/GenPage.vue'),
  },
  {
    ...extendRouteConstant.GEN_SERVICES,
    component: () => import('@/pages/genServices/GenServices.vue'),
  },
  {
    ...extendRouteConstant.GEN_INTERFACE,
    component: () => import('@/pages/genInterface/GenInterface.vue'),
  },
  {
    ...extendRouteConstant.FRAMEWORK_DESC,
    component: () => import('@/pages/frameworkDesc/FrameworkDesc.vue'),
  },
  {
    ...extendRouteConstant.TOOL_LIB,
    component: () => import('@/pages/toolLib/ToolLib.vue'),
  },
  {
    ...extendRouteConstant.COMPONENTS_LIB,
    component: () => import('@/pages/componentsLib/ComponentsLib.vue'),
  },
  {
    ...extendRouteConstant.RESOURCE_CSS,
    component: () => import('@/pages/resourceCss/ResourceCss.vue'),
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
]


export default routes
