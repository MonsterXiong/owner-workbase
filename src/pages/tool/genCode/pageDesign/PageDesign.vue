<template>
  <div class="common-page page-design">
    <div class="left-wrapper">
      <div class="top">
        <el-select v-model="projectId" filterable placeholder="请选择">
          <el-option v-for="item in projectList" :key="item.projectId" :label="item.name"
            :value="item.projectId"></el-option>
        </el-select>

        <span class="add-icon" @click="onAddProject"><i class="el-icon-plus"></i></span>
      </div>
      <div class="bottom">
        <div style="height:100%;">
          <header style="display:flex;font-size:14px;padding:0 5px;line-height:30px;border-bottom:1px solid #eee">
            <span>页面列表</span>
            <span class="add-icon" @click="onAddPage"><i class="el-icon-plus"></i></span>
          </header>
          <div style="height:calc(100% - 31px);overflow-y:auto">
            <el-tree ref="treeRef" node-key="pageId" :data="treeData" highlight-current :props="defaultProps"
              default-expand-all :expand-on-click-node="false" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="top">
        <el-button size="mini" type="primary" style="margin-right:10px" @click="onPageDesign">设计页面</el-button>
        <el-button size="mini" type="primary" style="margin-right:10px" @click="onClearPage">清空页面</el-button>
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">预览代码</el-button> -->
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">下载代码</el-button> -->
        <!-- <el-button size="mini" type="primary" style="margin-right:10px">下载完整项目代码</el-button> -->
        <el-button size="mini" type="primary" style="margin-right:10px" @click="onAddComponentTemplate">添加页面模板</el-button>
        <!-- 1.页面分类类别code + 类别名称 -->
        <!-- 1.页面模板（选择或者新增）类别category + 标识code + 模板名称 -->
      </div>
      <div class="bottom">
        <template v-if="!isPage">
          <div>这是功能页面</div>
        </template>
        <template v-else-if="currentComponent">
          <component :is="currentComponent"></component>
        </template>
      </div>
    </div>
    <PageDetailDialog @onClick="onClick" ref="pageDetailDialogRef" />
    <AddComponentTemplateDialog @onSubmit="onAddComponentTemplate" ref="addComponentTemplateDialogRef" />
    <AddOrUpdatePageDialog :projectId="projectId" :pageList="currentPageList" @onSubmit="onSubmitPage"
      ref="AddOrUpdatePageDialogRef" />
    <AddOrUpdateProjectDialog @onSubmit="onSubmitProject" ref="AddOrUpdateProjectDialogRef" />
  </div>
</template>

<script>
import PageDetailDialog from './components/PageDetailDialog.vue'
import { COMPONENT_MAP } from './template/index'
import { PAGE_TYPE } from '../constant/pageType'
import { listToTree } from '@/utils/commonUtil'
import AddComponentTemplateDialog from './components/AddComponentTemplateDialog.vue'
import AddOrUpdatePageDialog from './components/AddOrUpdatePageDialog.vue'
import AddOrUpdateProjectDialog from './components/AddOrUpdateProjectDialog.vue'
import { nanoid } from 'nanoid'
import {WfGenProjectService} from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
export default {
  data() {
    return {
      projectId: '',
      projectList: [],
      pageList: [
        {
          pageId: '1',
          parentId: null,
          bindProject: '1',
          pageName: '装备模块',
          type: 'module',
          code: ''
        },
        {
          pageId: '1-1',
          parentId: '1',
          bindProject: '1',
          pageName: '装备管理',
          type: 'page',
          code: '',
          param: {
            type: PAGE_TYPE.LEFT_LIST_RIGHT_TABLE
          }
        },
        {
          pageId: '2',
          parentId: null,
          bindProject: '2',
          pageName: '体系模块',
          type: 'module',
          code: '',
        },
        {
          pageId: '2-1',
          parentId: '2',
          bindProject: '2',
          pageName: '指标管理',
          type: 'page',
          code: '',
          param: {
            type: PAGE_TYPE.LEFT_TREE_RIGHT_TABLE
          }
        },
      ],
      formData: {
        type: '',
      },
      currentPageList: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'pageName',
      },
      currentActivePage: {},
    }
  },
  watch: {
    projectId: {
      handler(newValue) {
        if (newValue) {
          this.currentPageList = this.pageList.filter((item) => item.bindProject == newValue)
        }else{
          this.currentPageList = []
        }
      },
      immediate: true,
    },
    currentPageList: {
      handler(newValue) {
        this.treeData = listToTree(_.cloneDeep(newValue), { idKey: 'pageId' })
        this.currentActivePage = {}
        if (!Object.keys(this.currentActivePage).length && this.treeData?.length) {
          this.$nextTick(() => {
            const nodeData = this.selectFirstNode(this.treeData)
            if (nodeData) {
              this.currentActivePage = nodeData
              this.$refs.treeRef.setCurrentKey(nodeData.pageId)
            }
          })
        }

      },
      immediate: true,
    }
  },
  components: { PageDetailDialog, AddComponentTemplateDialog, AddOrUpdatePageDialog, AddOrUpdateProjectDialog },
  computed: {
    isPage() {
      return this.currentActivePage?.type == 'page'
    },
    currentComponent() {
      return COMPONENT_MAP[this.currentActivePage?.param?.type]
    }
  },
  mounted () {
    this.getProjectList()
  },
  methods: {
    async getProjectList(){
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      const {data} = await WfGenProjectService.queryWfGenProject(queryCondition)
      this.projectList = data
      if(!this.projectId && this.projectList.length){
        this.projectId = this.projectList[0].projectId
      }
    },
    onAddProject() {
      this.$refs.AddOrUpdateProjectDialogRef.show()
    },
    async onSubmitProject(param) {
      await WfGenProjectService.saveWfGenProject(param)
      await this.getProjectList()
    },
    onSubmitPage(param) {
      const id = nanoid()
      const pageInfo = {
        ...param,
        pageId: id
      }
      this.pageList.push(pageInfo)
      this.currentPageList = this.pageList.filter(item => item.bindProject == this.projectId)
      this.currentActivePage = pageInfo
    },
    onAddPage() {
      this.$refs.AddOrUpdatePageDialogRef.show()
    },
    onAddComponentTemplate() {
      this.$refs.addComponentTemplateDialogRef.show()
    },
    selectFirstNode(treeData) {
      for (let index = 0; index < treeData.length; index++) {
        const treeDataItem = treeData[index]
        if (treeDataItem.type === 'page') {
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
      this.$set(this.currentActivePage['param'],'type',pageType)
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

  >.top {
    padding-left: 5px;
    line-height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  >.bottom {
    height: calc(100% - 50px);
  }
}

.left-wrapper {
  width: 270px;

  >.top {
    display: flex;
    padding: 0 5px;
  }

  >.bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.right-wrapper {
  flex: 1;

  >.bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}


.add-icon {
  margin-left: auto;
  cursor: pointer
}
</style>
