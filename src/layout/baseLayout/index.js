import { EMIT_TYPE, VIEW_TYPE } from '@/common/constant'
import routesConstant from '@/router/routesConstant'

const MENU_CODE = {
  FE_WORKSPACE: 'fe-workspace',
  GEN_PLATFORM: 'gen-platform',
  TEST_DEMO:'test-demo',
  TOOL:'tool',
  GEN_SOFTWARE:'gen-software',
}

const genMenuData = [
  {
    menuCode: MENU_CODE.GEN_SOFTWARE,
    name: '代码生成项目',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: false,
  },
  {
    menuCode: 'gen-project',
    name: '项目列表',
    parent: MENU_CODE.GEN_SOFTWARE,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_SF_PROJECT.path,
  },
  {
    menuCode: 'page-design',
    name: '页面设计',
    parent: MENU_CODE.GEN_SOFTWARE,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_PAGE_DESIGN.path,
  },
]
const toolMenuData = [
  {
    menuCode: MENU_CODE.TOOL,
    name: '工具',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: false,
  },
  {
    menuCode: 'gen-adapter',
    name: '适配器生成',
    parent: MENU_CODE.TOOL,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_ADAPTER.path,
  },
]

const testMenuData = [
  {
    menuCode: MENU_CODE.TEST_DEMO,
    name: '测试',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: false,
  },
  {
    menuCode: 'test-layout',
    name: '基础布局',
    parent: MENU_CODE.TEST_DEMO,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.TEST_LAYOUT.path,
  },
]

const menuData = [
  // {
  //   menuCode: MENU_CODE.FE_WORKSPACE,
  //   name: '前端工作台',
  //   parent: null,
  //   icon: 'icon-a-ziyuan22',
  //   type: VIEW_TYPE.VIEW_MODULE,
  //   disabled: false,
  // },
  // {
  //   menuCode: MENU_CODE.GEN_PLATFORM,
  //   name: '代码生成平台',
  //   parent: null,
  //   icon: 'icon-a-ziyuan22',
  //   type: VIEW_TYPE.VIEW_MODULE,
  //   disabled: false,
  // },
  {
    menuCode: 'home-nav',
    name: '首页导航',
    parent: MENU_CODE.FE_WORKSPACE,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.WELCOME.path,
  },
  {
    menuCode: 'gen-project',
    name: '项目生成',
    parent: MENU_CODE.GEN_PLATFORM,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_PROJECT.path,
  },
  // ...testMenuData,
  // ...toolMenuData,
  ...genMenuData
]

export { MENU_CODE, menuData }
