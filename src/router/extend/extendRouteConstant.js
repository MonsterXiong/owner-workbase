const commonRouteConstant = {
  HOME: {
    path: '/',
    name: 'Home',
  },
  REDIRECT: {
    path: '/redirect',
    name: 'Redirect',
  },
  LOGIN: {
    path: '/login',
    name: 'login',
  },
  // 404
  NOT_FOUNT: {
    path: '*',
    name: 'notFound',
  },
}

const extendRouteConstant = {
  ...commonRouteConstant,
  WELCOME: {
    path: '/base/welcome',
    name: 'Welcome',
  },
  OFFLINE_DOC: {
    path: '/offlineDoc',
    name: 'OfflineDoc',
  },
  GEN_PROJECT:{
    path: '/genProject',
    name: 'GenProject',
  },
  GEN_PAGE:{
    path: '/genPage',
    name: 'GenPage',
  },
  GEN_SERVICES:{
    path: '/genServices',
    name: 'GenServices',
  },
  GEN_INTERFACE:{
    path: '/genInterface',
    name: 'GenInterface',
  },
  FRAMEWORK_DESC: {
    path: '/frameworkDesc',
    name: 'FrameworkDesc',
  },
  TOOL_LIB: {
    path: '/toolLib',
    name: 'ToolLib',
  },
  COMPONENTS_LIB: {
    path: '/componentsLib',
    name: 'ComponentsLib',
  },
  RESOURCE_CSS:{
    path: '/resourceCss',
    name: 'ResourceCss',
  },
  // -----------------------
  TEST_LAYOUT:{
    path: '/test/layout',
    name: 'TestLayout',
  },
  GEN_ADAPTER:{
    path: '/tool/genAdapter',
    name: 'GenAdapter',
  },
  GEN_CODE:{
    path: '/tool/genCode',
    name: 'GenCode',
  },
  GEN_SF_PROJECT:{
    path: '/gen/genSfProject',
    name: 'GenSFProject',
  },
  GEN_PAGE_DESIGN:{
    path: '/gen/genPageDesign',
    name: 'GenPageDesign',
  },
}
export default extendRouteConstant
