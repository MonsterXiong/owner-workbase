import { CATEGORY_TYPE } from './pageCategoryType'
import { PAGE_TYPE } from './pageType'

export const PAGE_LIST = [
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
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_LIST_RIGHT_TABLE,
    label: '左列表右表格',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_TREE_RIGHT_TABLE,
    label: '左树(列表)右表格',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_TREE_RIGHT_ORG_GRAPH,
    label: '左树右组织图',
  },
  {
    category: CATEGORY_TYPE.MATRIX,
    value: PAGE_TYPE.GENERAL_MATRIX,
    label: '通用矩阵',
  },
  {
    category: CATEGORY_TYPE.MATRIX,
    value: PAGE_TYPE.RELATION_MATRIX,
    label: '关系矩阵',
  },
  {
    category: CATEGORY_TYPE.FORM,
    value: PAGE_TYPE.GENERAL_FORM,
    label: '通用表单',
  },
  {
    category: CATEGORY_TYPE.BIZ,
    value: PAGE_TYPE.TASK_ORG_GRAPH,
    label: '(使命)任务分解图',
  },
  {
    category: CATEGORY_TYPE.BIZ,
    value: PAGE_TYPE.OPERATIONAL_CONCEPT_GRAPH,
    label: '作战概念图',
  },
  {
    category: CATEGORY_TYPE.LAYOUT,
    value: PAGE_TYPE.LEFT_CENTER_RIGHT_LAYOUT,
    label: '三栏布局(左中右)',
  },
  {
    category: CATEGORY_TYPE.LAYOUT,
    value: PAGE_TYPE.TOP_CENTER_BOTTOM_LAYOUT,
    label: '三栏布局(上中下)',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_LIST_RIGH_ORG_GRAPH,
    label: '左列表右组织图',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_ORG_GRAPH_RIGHT_FORM,
    label: '左组织图右表单',
  },
  {
    category: CATEGORY_TYPE.BIZ,
    value: PAGE_TYPE.LEFT_LIST_CENTER_ORG_GRAPH_RIGHT_FORM_XYD,
    label: '左列表中组织图右表单(新一代)',
  },
  {
    category: CATEGORY_TYPE.TREE,
    value: PAGE_TYPE.ORG_GRAPH_TREE,
    label: '组织图',
  },
  {
    category: CATEGORY_TYPE.BIZ,
    value: PAGE_TYPE.LEFT_LIST_CENTER_GENERAL_GRAPH_RIGHT_FORM_XYD,
    label: '左列表中普通绘图右表单(新一代)',
  },
  {
    category: CATEGORY_TYPE.COMPOSE,
    value: PAGE_TYPE.LEFT_LIST_RIGHT_RELATION_MATRIX,
    label: '左列表右关系矩阵',
  },
	{
    category: CATEGORY_TYPE.OTHER,
    value: PAGE_TYPE.READ_ONLY_WORD,
    label: '只读Word',
  },
	{
    category: CATEGORY_TYPE.MATRIX,
    value: PAGE_TYPE.WEIGHT_MATRIX,
    label: '权重矩阵',
  },
	/* Software Gen Code Placeholder */
]
