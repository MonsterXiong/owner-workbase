import Project from './project/Project.vue'
import PageDesign from './pageDesign/PageDesign'

export const HEADER_TYPE = {
  PROJECT: 'project',
  PAGE_DESIGN: 'pageDesign'
}

export const HEADER_LIST = [{
  label: '项目列表',
  value: HEADER_TYPE.PROJECT
}, {
  label: '页面设计',
  value: HEADER_TYPE.PAGE_DESIGN
}]


export const PAGE_MAP = {
  [HEADER_TYPE.PROJECT]: Project,
  [HEADER_TYPE.PAGE_DESIGN]: PageDesign
}
