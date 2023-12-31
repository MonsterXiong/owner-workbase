import { EMIT_TYPE, VIEW_TYPE } from '@/common/constant'
import routesConstant from '@/router/routesConstant'

const MENU_CODE = {
  FE_WORKSPACE: 'fe-workspace',
  GEN_PLATFORM: 'gen-platform',
  OTHER: 'other',
}

const MENU_ITEM_CODE = {
  HOME_NAV:'home-nav',
  OFFLINE_DOC:'offline-doc',
  GEN_PROJECT:'gen-project',
  GEN_PAGE:'gen-page',
  GEN_SERVICES:'gen-services',
  GEN_INTERFACE:'gen_interface',
  FRAMEWORK_DESC:'framework-desc',
  TOOL_LIB:'tool-lib',
  COMPONENTS_LIB:'components-lib',
  RESOURCE_CSS:'resource-css',
}

const menuData = [
  {
    menuCode: MENU_CODE.FE_WORKSPACE,
    name: '前端工作台',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: false,
  },
  {
    menuCode: MENU_CODE.GEN_PLATFORM,
    name: '代码生成平台',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: false,
  },
  {
    menuCode: MENU_CODE.OTHER,
    name: '其它',
    parent: null,
    icon: 'icon-a-ziyuan22',
    type: VIEW_TYPE.VIEW_MODULE,
    disabled: true,
  },
  {
    menuCode: MENU_ITEM_CODE.HOME_NAV,
    name: '首页导航',
    parent: MENU_CODE.FE_WORKSPACE,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.WELCOME.path,
  },
  {
    menuCode: MENU_ITEM_CODE.OFFLINE_DOC,
    name: '离线文档',
    parent: MENU_CODE.FE_WORKSPACE,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.OFFLINE_DOC.path,
  },
  {
    menuCode: MENU_ITEM_CODE.GEN_PROJECT,
    name: '项目生成',
    parent: MENU_CODE.GEN_PLATFORM,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_PROJECT.path,
  },
  {
    menuCode: MENU_ITEM_CODE.GEN_PAGE,
    name: '页面生成',
    parent: MENU_CODE.GEN_PLATFORM,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_PAGE.path,
  },
  {
    menuCode: MENU_ITEM_CODE.GEN_SERVICES,
    name: 'services生成',
    parent: MENU_CODE.GEN_PLATFORM,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_SERVICES.path,
  },
  {
    menuCode: MENU_ITEM_CODE.GEN_INTERFACE,
    name: '接口生成',
    parent: MENU_CODE.GEN_PLATFORM,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.GEN_INTERFACE.path,
  },
  {
    menuCode: MENU_ITEM_CODE.FRAMEWORK_DESC,
    name: '框架说明',
    parent: MENU_CODE.OTHER,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.FRAMEWORK_DESC.path,
  },
  {
    menuCode: MENU_ITEM_CODE.TOOL_LIB,
    name: '工具函数库',
    parent: MENU_CODE.OTHER,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.TOOL_LIB.path,
  },
  {
    menuCode: MENU_ITEM_CODE.COMPONENTS_LIB,
    name: '组件库',
    parent: MENU_CODE.OTHER,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.COMPONENTS_LIB.path,
  },
  {
    menuCode: MENU_ITEM_CODE.RESOURCE_CSS,
    name: 'CSS资源',
    parent: MENU_CODE.OTHER,
    icon: 'icon-shouye',
    type: VIEW_TYPE.VIEW_PAGE,
    eventType: EMIT_TYPE.PAGE,
    eventParams: routesConstant.RESOURCE_CSS.path,
  },
]

export { MENU_CODE, menuData }
