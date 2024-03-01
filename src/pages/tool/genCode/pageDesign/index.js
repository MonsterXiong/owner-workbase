import { PAGE_TYPE } from "../constant/pageType"
import { CATEGORY_TYPE } from "../constant/pageCategoryType"

export const CATEGORY_LIST = [
  {
    value: CATEGORY_TYPE.COMPOSE,
    label: '组合类',
  },
  {
    value: CATEGORY_TYPE.FORM,
    label: '表单类',
  },
  {
    value: CATEGORY_TYPE.TABLE,
    label: '表格类',
  },
  {
    value: CATEGORY_TYPE.MATRIX,
    label: '矩阵类',
  },
  {
    value: CATEGORY_TYPE.TREE,
    label: '树形类',
  },
  {
    value: CATEGORY_TYPE.LIST,
    label: '列表类',
  },
  {
    value: CATEGORY_TYPE.GLOBAL_DIALOG,
    label: '全局弹窗类',
  },
]

export const PAGE_LIST = [
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_LIST_RIGHT_TABLE,
    label: '左列表右表格',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_TREE_RIGHT_TABLE,
    label: '左树形右表格',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_TREE_RIGHT_GRAPH,
    label: '左树右图',
  },
  {
    category: CATEGORY_TYPE.FORM,
    value: PAGE_TYPE.GENERAL_FORM,
    label: '通用表单',
  },
  {
    category: CATEGORY_TYPE.TABLE,
    value: PAGE_TYPE.GENERAL_TABLE,
    label: '通用表格',
  },
  {
    category: CATEGORY_TYPE.TABLE,
    value: PAGE_TYPE.MERGE_TABLE,
    label: '合并表格',
  },
  {
    category: CATEGORY_TYPE.TABLE,
    value: PAGE_TYPE.TREE_TABLE,
    label: '树形表格',
  },
  {
    category: CATEGORY_TYPE.TABLE,
    value: PAGE_TYPE.CARD_TABLE,
    label: '卡片表格',
  },
  {
    category: CATEGORY_TYPE.TABLE,
    value: PAGE_TYPE.EDIT_TABLE,
    label: '编辑表格',
  },
  {
    category: CATEGORY_TYPE.MATRIX,
    value: PAGE_TYPE.GENERAL_MATRIX,
    label: '通用矩阵',
  },
]

// 写一个工具，用于增加一类组件的基础事项
// 加一个表格类的xxx组件，则直接生成完，只需要开发这个表格类组件
