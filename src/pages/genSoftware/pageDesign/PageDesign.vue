<template>
  <div class="common-page page-design">
    <div class="left-wrapper">
      <div class="top">
        <GenProjectSelect ref="genProjectSelectRef" @onChange="onCurrentProject" @onAdd="onAddProject"></GenProjectSelect>
      </div>
      <div class="bottom">
        <GenMenuTree ref="genMenuTreeRef" :projectId="projectId" @onChange="onCurrentMenu" @onAdd="onAddPage"></GenMenuTree>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="top">
        <el-button size="mini" type="primary" @click="onPageDesign">设计页面</el-button>
        <el-button size="mini" type="primary" @click="onClearPage">清空页面</el-button>
        <!-- <el-button size="mini" type="primary" >预览代码</el-button> -->
        <!-- <el-button size="mini" type="primary" >下载代码</el-button> -->
        <el-button size="mini" @click="onDownloadCompleteCode">下载完整项目代码</el-button>
        <el-button size="mini" @click="onAddComponentTemplate">添加页面模板</el-button>
      </div>
      <div class="bottom">
        <SetPageConfig :currentActivePage="currentActivePage" ref="setPageConfigRef"></SetPageConfig>
      </div>
    </div>
    <PageDetailDialog @onClick="onChangeMenuType" ref="pageDetailDialogRef" />
    <AddComponentTemplateDialog @onSubmit="onAddComponentTemplate" ref="addComponentTemplateDialogRef" />
    <AddOrUpdateMenuDialog :projectId="projectId" @refresh="onRefreshMenuList" ref="AddOrUpdateMenuDialogRef" />
    <AddOrUpdateProjectDialog @refresh="onRefreshProjectList" ref="AddOrUpdateProjectDialogRef" />
  </div>
</template>

<script>
import PageDetailDialog from './components/PageDetailDialog.vue'
import { PAGE_TYPE } from '../constant/pageType'
import AddComponentTemplateDialog from './components/AddComponentTemplateDialog.vue'
import AddOrUpdateMenuDialog from './components/AddOrUpdateMenuDialog.vue'
import AddOrUpdateProjectDialog from '../project/components/AddOrUpdateProjectDialog.vue'
import GenProjectSelect from '@/bizComponents/genProjectSelect/GenProjectSelect'
import GenMenuTree from '@/bizComponents/genMenuTree/GenMenuTree'
import SetPageConfig from './components/SetPageConfig.vue'
import { SfMenuDetailService, GenExtendService } from '@/services'
export default {
  data() {
    return {
      projectId: '',
      projectList: [],
      menuList: [],
      currentActivePage: {},
    }
  },
  components: { GenProjectSelect, GenMenuTree, SetPageConfig, PageDetailDialog, AddComponentTemplateDialog, AddOrUpdateMenuDialog, AddOrUpdateProjectDialog },
  methods: {
    async onDownloadCompleteCode() {
      const file = await GenExtendService.genSfProjectByProjectId(this.projectId)
      const href = URL.createObjectURL(file)
      const box = document.createElement('a')
      box.href = href
      box.click()
    },
    onRefreshProjectList(data) {
      this.$refs.genProjectSelectRef.refresh()
      this.$refs.genProjectSelectRef.setCurrentKey(data.projectId)
    },
    onCurrentMenu(menuData) {
      this.currentActivePage = menuData
    },
    async onCurrentProject(projectId) {
      this.projectId = projectId
    },
    onAddProject() {
      this.$refs.AddOrUpdateProjectDialogRef.show()
    },
    async onRefreshMenuList(menuData) {
      this.$refs.genMenuTreeRef.refresh()
      this.$refs.genMenuTreeRef.setCurrentKey(menuData.menuId)
      this.currentActivePage = menuData
    },
    onAddPage() {
      this.$refs.AddOrUpdateMenuDialogRef.show()
    },
    onAddComponentTemplate() {
      this.$refs.addComponentTemplateDialogRef.show()
    },
    async onChangeMenuType(paramData) {
      const { categoryType, menuType } = paramData
      const param = {
        categoryType: categoryType ? categoryType : 'empty',
        type: menuType ? menuType : 'empty',
      }
      // 其他默认参数需要设置
      const menuParam = JSON.stringify(param)
      const menuDetailInfo = {
        bindMenu: this.currentActivePage.menuId,
        menuParam,
      }
      await SfMenuDetailService.saveSfMenuDetail(menuDetailInfo)
      this.refreshPageConfig()
    },
    onPageDesign() {
      this.$refs.pageDetailDialogRef.show()
    },
    async onClearPage() {
      const menuDetailInfo = this.$refs.setPageConfigRef.getCurrentMenuDetail()
      await SfMenuDetailService.deleteSfMenuDetailBatch([menuDetailInfo.menuDetailId])
      this.refreshPageConfig()
    },
    refreshPageConfig() {
      this.$refs.setPageConfigRef.refresh(this.currentActivePage.menuId)
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
    background-color: rgba(255, 255, 255, .5);
    padding-left: 5px;
    line-height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  > .bottom {
    background-color: rgba(255, 255, 255, .5);
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
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}

.right-wrapper {
  flex: 1;
  .top {
    .el-button + .el-button {
      margin-left: 10px !important;
    }
  }
  > .bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
