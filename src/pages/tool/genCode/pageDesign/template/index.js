
import {PAGE_TYPE} from '../../constant/pageType'
import LeftListRightTable from './leftListRightTable/LeftListRightTable.vue'
import LeftTreeRightTable from './leftTreeRightTable/LeftTreeRightTable.vue'

export const COMPONENT_MAP= {
  [PAGE_TYPE.LEFT_LIST_RIGHT_TABLE]: LeftListRightTable,
  [PAGE_TYPE.LEFT_TREE_RIGHT_TABLE]: LeftTreeRightTable,
}
