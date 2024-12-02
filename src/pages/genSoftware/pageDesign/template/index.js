import { PAGE_TYPE } from '../../constant/pageType'
import GeneralTable from './generalTable/GeneralTable.vue'
import MergeTable from './mergeTable/MergeTable.vue'
import TreeTable from './treeTable/TreeTable.vue'
import CardTable from './cardTable/CardTable.vue'
import EditTable from './editTable/EditTable.vue'
import LeftListRightTable from './leftListRightTable/LeftListRightTable.vue'
import LeftTreeRightTable from './leftTreeRightTable/LeftTreeRightTable.vue'
import LeftTreeRightOrgGraph from './leftTreeRightOrgGraph/LeftTreeRightOrgGraph.vue'
import RelationMatrix from './relationMatrix/RelationMatrix.vue'
import GeneralForm from './generalForm/GeneralForm.vue'
import TaskOrgGraph from './taskOrgGraph/TaskOrgGraph.vue'
import OperationalConceptGraph from './operationalConceptGraph/OperationalConceptGraph.vue'
import LeftCenterRightLayout from './leftCenterRightLayout/LeftCenterRightLayout.vue'
import TopCenterBottomLayout from './topCenterBottomLayout/TopCenterBottomLayout.vue'
import LeftListRighOrgGraph from './leftListRighOrgGraph/LeftListRighOrgGraph.vue'
import LeftOrgGraphRightForm from './leftOrgGraphRightForm/LeftOrgGraphRightForm.vue'
import LeftListCenterOrgGraphRightFormXyd from './leftListCenterOrgGraphRightFormXyd/LeftListCenterOrgGraphRightFormXyd.vue'
import OrgGraphTree from './orgGraphTree/OrgGraphTree.vue'
import LeftListCenterGeneralGraphRightFormXyd from './leftListCenterGeneralGraphRightFormXyd/LeftListCenterGeneralGraphRightFormXyd.vue'
import GeneralMatrix from './generalMatrix/GeneralMatrix.vue'
import LeftListRightRelationMatrix from './leftListRightRelationMatrix/LeftListRightRelationMatrix.vue'
import ReadOnlyWord from './readOnlyWord/ReadOnlyWord.vue'
import WeightMatrix from './weightMatrix/WeightMatrix.vue'
import CrudTable from './crudTable/CrudTable.vue'
import BattleActivityDesign from './battleActivityDesign/BattleActivityDesign.vue'
import LeftListCenterGeneralGraphRightForm from './leftListCenterGeneralGraphRightForm/LeftListCenterGeneralGraphRightForm.vue'
import StatisticsPie from './statisticsPie/StatisticsPie.vue'
import StatisticsLine from './statisticsLine/StatisticsLine.vue'
import StatisticsBar from './statisticsBar/StatisticsBar.vue'
import StatisticsScatter from './statisticsScatter/StatisticsScatter.vue'
import StatisticsRadar from './statisticsRadar/StatisticsRadar.vue'
import StatisticsRelation from './statisticsRelation/StatisticsRelation.vue'
import StatisticsMatrixtree from './statisticsMatrixtree/StatisticsMatrixtree.vue'
import StatisticsRisingsun from './statisticsRisingsun/StatisticsRisingsun.vue'
import StatisticsSankey from './statisticsSankey/StatisticsSankey.vue'
import StatisticsInstrumentpanel from './statisticsInstrumentpanel/StatisticsInstrumentpanel.vue'
import Statistics_3dbar from './statistics_3dbar/Statistics_3dbar.vue'
import BizTable from './bizTable/BizTable.vue'
import BizOrg from './bizOrg/BizOrg.vue'
import BizLeftListAndRightTable from './bizLeftListAndRightTable/BizLeftListAndRightTable.vue'
import BizLeftListAndRightOrg from './bizLeftListAndRightOrg/BizLeftListAndRightOrg.vue'
import BizLeftTreeAndRightTable from './bizLeftTreeAndRightTable/BizLeftTreeAndRightTable.vue'
import BizLeftTreeAndRightOrg from './bizLeftTreeAndRightOrg/BizLeftTreeAndRightOrg.vue'
import BizForm from './bizForm/BizForm.vue'
/* Software Gen Code Require Placeholder */

// 可以使用自动导入隐射出一个动态组件MAP

export const COMPONENT_MAP = {
  [PAGE_TYPE.GENERAL_TABLE]: GeneralTable,
	[PAGE_TYPE.MERGE_TABLE]: MergeTable,
	[PAGE_TYPE.TREE_TABLE]: TreeTable,
	[PAGE_TYPE.CARD_TABLE]: CardTable,
	[PAGE_TYPE.EDIT_TABLE]: EditTable,
	[PAGE_TYPE.LEFT_LIST_RIGHT_TABLE]: LeftListRightTable,
	[PAGE_TYPE.LEFT_TREE_RIGHT_TABLE]: LeftTreeRightTable,
	[PAGE_TYPE.LEFT_TREE_RIGHT_ORG_GRAPH]: LeftTreeRightOrgGraph,
	[PAGE_TYPE.RELATION_MATRIX]: RelationMatrix,
	[PAGE_TYPE.GENERAL_FORM]: GeneralForm,
	[PAGE_TYPE.TASK_ORG_GRAPH]: TaskOrgGraph,
	[PAGE_TYPE.OPERATIONAL_CONCEPT_GRAPH]: OperationalConceptGraph,
	[PAGE_TYPE.LEFT_CENTER_RIGHT_LAYOUT]: LeftCenterRightLayout,
	[PAGE_TYPE.TOP_CENTER_BOTTOM_LAYOUT]: TopCenterBottomLayout,
	[PAGE_TYPE.LEFT_LIST_RIGH_ORG_GRAPH]: LeftListRighOrgGraph,
	[PAGE_TYPE.LEFT_ORG_GRAPH_RIGHT_FORM]: LeftOrgGraphRightForm,
	[PAGE_TYPE.LEFT_LIST_CENTER_ORG_GRAPH_RIGHT_FORM_XYD]: LeftListCenterOrgGraphRightFormXyd,
	[PAGE_TYPE.ORG_GRAPH_TREE]: OrgGraphTree,
	[PAGE_TYPE.LEFT_LIST_CENTER_GENERAL_GRAPH_RIGHT_FORM_XYD]: LeftListCenterGeneralGraphRightFormXyd,
	[PAGE_TYPE.GENERAL_MATRIX]: GeneralMatrix,
	[PAGE_TYPE.LEFT_LIST_RIGHT_RELATION_MATRIX]: LeftListRightRelationMatrix,
	[PAGE_TYPE.READ_ONLY_WORD]: ReadOnlyWord,
	[PAGE_TYPE.WEIGHT_MATRIX]: WeightMatrix,
	[PAGE_TYPE.CRUD_TABLE]: CrudTable,
	[PAGE_TYPE.BATTLE_ACTIVITY_DESIGN]: BattleActivityDesign,
	[PAGE_TYPE.LEFT_LIST_CENTER_GENERAL_GRAPH_RIGHT_FORM]: LeftListCenterGeneralGraphRightForm,
	[PAGE_TYPE.STATISTICS_PIE]: StatisticsPie,
	[PAGE_TYPE.STATISTICS_LINE]: StatisticsLine,
	[PAGE_TYPE.STATISTICS_BAR]: StatisticsBar,
	[PAGE_TYPE.STATISTICS_SCATTER]: StatisticsScatter,
	[PAGE_TYPE.STATISTICS_RADAR]: StatisticsRadar,
	[PAGE_TYPE.STATISTICS_RELATION]: StatisticsRelation,
	[PAGE_TYPE.STATISTICS_MATRIXTREE]: StatisticsMatrixtree,
	[PAGE_TYPE.STATISTICS_RISINGSUN]: StatisticsRisingsun,
	[PAGE_TYPE.STATISTICS_SANKEY]: StatisticsSankey,
	[PAGE_TYPE.STATISTICS_INSTRUMENTPANEL]: StatisticsInstrumentpanel,
	[PAGE_TYPE.STATISTICS_3DBAR]: Statistics_3dbar,
	[PAGE_TYPE.BIZ_TABLE]: BizTable,
	[PAGE_TYPE.BIZ_ORG]: BizOrg,
	[PAGE_TYPE.BIZ_LEFT_LIST_AND_RIGHT_TABLE]: BizLeftListAndRightTable,
	[PAGE_TYPE.BIZ_LEFT_LIST_AND_RIGHT_ORG]: BizLeftListAndRightOrg,
	[PAGE_TYPE.BIZ_LEFT_TREE_AND_RIGHT_TABLE]: BizLeftTreeAndRightTable,
	[PAGE_TYPE.BIZ_LEFT_TREE_AND_RIGHT_ORG]: BizLeftTreeAndRightOrg,
	[PAGE_TYPE.BIZ_FORM]: BizForm,
	/* Software Gen Code Placeholder */
}
