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
  GEN_PROJECT:{
    path: '/genProject',
    name: 'GenProject',
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
