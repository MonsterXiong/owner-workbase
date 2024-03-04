<template>
  <div class="gen-menu-tree">
    <header>
      <span>页面列表</span>
      <span class="add-icon" @click="onAdd"><i class="el-icon-plus"></i></span>
    </header>
    <div class="tree-wrapper">
      <el-tree ref="treeRef" node-key="menuId" :data="treeData" highlight-current :props="defaultProps" default-expand-all
        :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
import { SfMenuService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import { listToTree } from '@/utils/commonUtil'
export default {
  props: {
    projectId: {},
  },
  data() {
    return {
      menuList: [],
      currentActivePage: {},
      defaultProps: {
        children: 'children',
        label: 'menuName',
      },
      treeData: [],
    }
  },
  watch: {
    projectId(newValue, oldValue) {
      if (newValue) {
        this.getMenuList()
      }
    },
    currentActivePage(newValue) {
      this.$emit('onChange', newValue)
    },
  },
  methods: {
    refresh(){
      this.getMenuList()
    },
    setCurrentKey(menuId){
      this.$refs.treeRef.setCurrentKey(menuId)
    },
    onAdd() {
      this.$emit('onAdd')
    },
    handleNodeClick(data) {
      this.currentActivePage = data
    },
    selectFirstNode(treeData) {
      for (let index = 0; index < treeData.length; index++) {
        const treeDataItem = treeData[index]
        if (treeDataItem?.menuType == 'page') {
          return treeDataItem
        } else {
          if (treeDataItem?.children?.length) {
            return this.selectFirstNode(treeDataItem.children)
          }
        }
      }
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
            this.setCurrentKey(nodeData.menuId)
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.gen-menu-tree {
  height: 100%;
  width: 100%;

  header {
    width: 100%;
    display: flex;
    font-size: 14px;
    padding: 0 5px;
    line-height: 30px;
    border-bottom: 1px solid #eee
  }

  .add-icon {
    margin-left: auto;
    cursor: pointer;
  }

  .tree-wrapper{
    height: calc(100% - 31px);
    overflow-y: auto
  }
}
</style>
