<template>
  <div class="common-page page-design">
    <div class="left-wrapper">
      <div class="top">
        <el-select v-model="projectId" filterable placeholder="请选择" @change="onChangeProject">
          <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
        </el-select>

        <span class="add-icon" @click="onAddProject"><i class="el-icon-plus"></i></span>
      </div>
      <div class="bottom">
        <div style="height: 100%">
          <header style="display: flex; font-size: 14px; padding: 0 5px; line-height: 30px; border-bottom: 1px solid #eee">
            <span>页面列表</span>
            <span class="add-icon" @click="onAddPage"><i class="el-icon-plus"></i></span>
          </header>
          <div style="height: calc(100% - 31px); overflow-y: auto">
            <el-tree
              ref="treeRef"
              node-key="menuId"
              :data="treeData"
              highlight-current
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="top">
        <el-button size="mini" type="primary" style="margin-right: 10px" @click="onPageDesign">设计页面</el-button>
        <el-button size="mini" type="primary" style="margin-right: 10px" @click="onClearPage">清空页面</el-button>
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">预览代码</el-button> -->
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">下载代码</el-button> -->
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">下载完整项目代码</el-button> -->
        <el-button size="mini" type="primary" style="margin-right: 10px" @click="onAddComponentTemplate">添加页面模板</el-button>
        <!-- 1.页面分类类别code + 类别名称 -->
        <!-- 1.页面模板（选择或者新增）类别category + 标识code + 模板名称 -->
      </div>
      <div class="bottom">
        <template v-if="isModule">
          <div>这是模块</div>
        </template>
        <template v-else-if="currentComponent">
          <component :is="currentComponent"></component>
        </template>
      </div>
    </div>
    <PageDetailDialog @onClick="onClick" ref="pageDetailDialogRef" />
    <AddComponentTemplateDialog @onSubmit="onAddComponentTemplate" ref="addComponentTemplateDialogRef" />
    <AddOrUpdateMenuDialog :projectId="projectId" :menuList="menuList" @refresh="onRefreshMenuList" ref="AddOrUpdateMenuDialogRef" />
    <AddOrUpdateProjectDialog @refresh="getProjectList" ref="AddOrUpdateProjectDialogRef" />
  </div>
</template>

<script>
import PageDetailDialog from './components/PageDetailDialog.vue'
import { COMPONENT_MAP } from './template/index'
import { PAGE_TYPE } from '../constant/pageType'
import { listToTree } from '@/utils/commonUtil'
import AddComponentTemplateDialog from './components/AddComponentTemplateDialog.vue'
import AddOrUpdateMenuDialog from './components/AddOrUpdateMenuDialog.vue'
import AddOrUpdateProjectDialog from '../project/components/AddOrUpdateProjectDialog.vue'
import { SfProjectService, SfMenuService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
export default {
  data() {
    return {
      projectId: '',
      projectList: [],
      menuList: [],
      formData: {
        type: '',
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      currentActivePage: {},
    }
  },
  components: { PageDetailDialog, AddComponentTemplateDialog, AddOrUpdateMenuDialog, AddOrUpdateProjectDialog },
  computed: {
    isModule() {
      return !this.isPage(this.currentActivePage)
    },
    currentComponent() {
      return COMPONENT_MAP[this.currentActivePage?.param?.type]
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.getProjectList()
      await this.getMenuList()
    },
    isPage(menuItem) {
      return menuItem?.menuType == 'page'
    },
    onChangeProject(value) {
      this.getMenuList()
    },
    async getMenuList() {
      this.menuList = []
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bind_project', this.projectId)
      queryCondition.buildAscSort('sort')
      const { data } = await SfMenuService.querySfMenu(queryCondition)
      this.menuList = data
      this.treeData = listToTree(_.cloneDeep(data), { idKey: 'menuId' })
      this.currentActivePage = {}
      if (!Object.keys(this.currentActivePage).length && this.treeData?.length) {
        this.$nextTick(() => {
          const nodeData = this.selectFirstNode(this.treeData)
          if (nodeData) {
            this.currentActivePage = nodeData
            this.$refs.treeRef.setCurrentKey(nodeData.menuId)
          }
        })
      }
    },
    async getProjectList() {
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildAscSort('sort')
      const { data } = await SfProjectService.querySfProject(queryCondition)
      this.projectList = data
      if (!this.projectId && this.projectList.length) {
        this.projectId = this.projectList[0].projectId
      }
    },
    onAddProject() {
      this.$refs.AddOrUpdateProjectDialogRef.show()
    },
    async onRefreshMenuList(menuData) {
      await this.getMenuList()
      this.currentActivePage = menuData
    },
    onAddPage() {
      this.$refs.AddOrUpdateMenuDialogRef.show()
    },
    onAddComponentTemplate() {
      this.$refs.addComponentTemplateDialogRef.show()
    },
    selectFirstNode(treeData) {
      for (let index = 0; index < treeData.length; index++) {
        const treeDataItem = treeData[index]
        if (this.isPage(treeDataItem)) {
          return treeDataItem
        } else {
          if (treeDataItem?.children?.length) {
            return this.selectFirstNode(treeDataItem.children)
          }
        }
      }
    },
    handleNodeClick(data) {
      this.currentActivePage = data
    },
    onClick(pageType) {
      if (!this.currentActivePage?.param) {
        this.$set(this.currentActivePage, 'param', {})
      }
      this.$set(this.currentActivePage['param'], 'type', pageType)
    },
    onPageDesign() {
      this.$refs.pageDetailDialogRef.show()
    },
    onClearPage() {
      this.currentActivePage.param = {}
    },
  },
}
</script>

<style lang="less" scoped>
.page-design {
  display: flex;
  gap: 10px;
}

.left-wrapper,
.right-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > .top {
    padding-left: 5px;
    line-height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  > .bottom {
    height: calc(100% - 50px);
  }
}

.left-wrapper {
  width: 270px;

  > .top {
    display: flex;
    padding: 0 5px;
  }

  > .bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.right-wrapper {
  flex: 1;

  > .bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.add-icon {
  margin-left: auto;
  cursor: pointer;
}
</style>
