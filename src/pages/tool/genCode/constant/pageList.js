import { CATEGORY_TYPE } from "./pageCategoryType";
import { PAGE_TYPE } from "./pageType";

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
  /* Software Gen Code Placeholder */
]
