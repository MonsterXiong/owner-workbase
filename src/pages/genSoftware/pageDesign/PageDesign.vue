<template>
  <div class="common-page page-design">
    <div class="left-wrapper">
      <div class="top">
        <GenProjectSelect ref="genProjectSelectRef" @onChange="onCurrentProject" download></GenProjectSelect>
      </div>
      <div class="bottom">
        <GenMenuTree ref="genMenuTreeRef" :projectId="projectId" @onChange="onCurrentMenu" @onAdd="onAddPage"></GenMenuTree>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="top">
        <template v-if="isPage">
          <el-button size="mini" type="primary" @click="onPageDesign">设计页面</el-button>
          <el-button size="mini" type="danger" @click="onClearPage">清空页面</el-button>
          <el-button size="mini" plain type="primary" @click="onPriviewPageCode">预览代码</el-button>
          <el-button size="mini" plain type="primary" @click="onDownloadPageCode">下载代码</el-button>
          <el-button size="mini" plain type="primary" @click="onPriviewMenuCode">预览路由</el-button>
          <el-button size="mini" plain type="primary" @click="onDownloadMenuCode">下载路由</el-button>
        </template>
        <el-button size="mini" plain type="primary" @click="onPriviewServiceCode">预览API</el-button>
        <el-button size="mini" plain type="primary" @click="onDownloadServiceCode">下载API</el-button>
        <el-button size="mini" plain type="primary" @click="onPriviewEnumCode">预览枚举</el-button>
        <el-button size="mini" plain type="primary" @click="onDownloadEnumCode">下载枚举</el-button>
        <el-button size="mini" plain type="primary" @click="onAddComponentTemplate" style="margin-left:auto !important;">添加页面模板-工具</el-button>
      </div>
      <div class="bottom">
        <SetPageConfig :projectId="projectId" :currentActivePage="currentActivePage" ref="setPageConfigRef"></SetPageConfig>
      </div>
    </div>
    <PageDetailDialog @onClick="onChangeMenuType" ref="pageDetailDialogRef" />
    <AddComponentTemplateDialog ref="addComponentTemplateDialogRef" />
    <AddOrUpdateMenuDialog :projectId="projectId" @refresh="onRefreshMenuList" ref="AddOrUpdateMenuDialogRef" />
    <PreviewCodeDialog ref="previewCodeDialogRef"></PreviewCodeDialog>
  </div>
</template>

<script>
import PageDetailDialog from './components/PageDetailDialog.vue'
import AddComponentTemplateDialog from './components/AddComponentTemplateDialog.vue'
import AddOrUpdateMenuDialog from './components/AddOrUpdateMenuDialog.vue'
import PreviewCodeDialog from './components/PreviewCodeDialog.vue'
import GenProjectSelect from '@/bizComponents/genProjectSelect/GenProjectSelect'
import GenMenuTree from '@/bizComponents/genMenuTree/GenMenuTree'
import SetPageConfig from './components/SetPageConfig.vue'
import { SfMenuDetailService, GenExtendService } from '@/services'
import { downloadFile } from '@/utils/fileUtil'
export default {
  data() {
    return {
      projectId:'',
      projectList: [],
      menuList: [],
      currentActivePage: {},
    }
  },
  computed: {
    currentMenuId() {
      return this.currentActivePage.menuId
    },
    isPage() {
      return this.currentActivePage?.menuType == 'page'
    },
  },
  mounted () {
    const projectId = this.$route.query.projectId
    if( projectId ){
      this.$refs.genProjectSelectRef.setCurrentKey(projectId)
    }
  },
  components: { GenProjectSelect, GenMenuTree, SetPageConfig, PageDetailDialog, AddComponentTemplateDialog, AddOrUpdateMenuDialog, PreviewCodeDialog },
  methods: {
    onRefreshByProjectId(projectId) {
      this.$refs.genProjectSelectRef.refresh()
      this.$refs.genProjectSelectRef.setCurrentKey(projectId)
    },

    async onDownloadEnumCode() {
      const file = await GenExtendService.genSfEnumByProjectId(this.projectId)
      downloadFile(file)
    },
    async onDownloadMenuCode() {
      const file = await GenExtendService.genMenuCodeByMenuId(this.currentMenuId)
      downloadFile(file)
    },
    async onDownloadServiceCode() {
      const file = await GenExtendService.genSfServiceByProjectId(this.projectId)
      downloadFile(file)
    },
    previewCode(data){
      if (data?.length) {
        this.$refs.previewCodeDialogRef.show(data)
      } else {
        return this.$message.warning('暂无可以预览的代码')
      }
    },
    async onPriviewPageCode() {
      if (!this.currentMenuId) {
        return this.$message.warning('请选择页面')
      }
      const { data } = await GenExtendService.genSfPageCodeByMenuId(this.currentMenuId)
      this.previewCode(data)
    },
    async onPriviewMenuCode(){
      if (!this.currentMenuId) {
        return this.$message.warning('请选择页面')
      }
      const { data } = await GenExtendService.getMenuCodeByMenuId(this.currentMenuId)
      this.previewCode(data)
    },
    async onPriviewEnumCode() {
      if (!this.projectId) {
        return this.$message.warning('请选择项目')
      }
      const { data } = await GenExtendService.getSfEnumByProjectId(this.projectId)
      this.previewCode(data.map(item=>{return {...item,filePath:item.name}}))
    },
    async onPriviewServiceCode() {
      if (!this.projectId) {
        return this.$message.warning('请选择项目')
      }
      const { data } = await GenExtendService.getSfServiceByProjectId(this.projectId)
      this.previewCode(data.map(item=>{return {...item,filePath:item.name}}))
    },
    async onDownloadPageCode() {
      if (!this.currentMenuId) {
        return this.$message.warning('请选择页面')
      }
      const file = await GenExtendService.downloadSfPageCodeByMenuId(this.currentMenuId)
      downloadFile(file)
    },
    onCurrentMenu(menuData) {
      this.currentActivePage = menuData
    },
    async onCurrentProject(projectId) {
      this.projectId = projectId
      if (this.$route.query.projectId !== projectId) {
        this.$router.replace({
          path: this.$route.fullpath,
          query: {
            projectId,
          },
        })
      }
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
        templateParam: {},
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
    background-color: rgba(255, 255, 255, 0.5);
    padding-left: 5px;
    line-height: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  > .bottom {
    background-color: rgba(255, 255, 255, 0.5);
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
    display: flex;
    padding:6px;
    .el-button + .el-button {
      margin-left: 10px !important;
    }
  }
  > .bottom {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
