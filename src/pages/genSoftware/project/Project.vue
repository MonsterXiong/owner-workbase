<template>
  <TableLayout>
    <template #query>
      <ProjectQuery @onEvent="onEvent" :queryForm.sync="queryForm"></ProjectQuery>
    </template>
    <ProjectTable
      :pageInfo.sync="pageInfo"
      :tableData="tableData"
      :total="total"
      @onOpen="onOpen"
      @onSyncUpdate="onSyncUpdate"
      @onDownload="onDownload"
      @onEdit="onEdit"
      @onDelete="onDelete"
      @onDbConfig="onDbConfig"
      @onProjectConfig="onProjectConfig"
      @selection-change="onSelectionChange"
    ></ProjectTable>
    <ProjectDialog ref="projectDialogRef" @submit="onSubmit"></ProjectDialog>
    <ProjectConfigDialog ref="projectConfigDialogRef" @submit="onProjectConfigSubmit"></ProjectConfigDialog>
    <ProjectDbConfigDialog ref="projectDbConfigDialogRef" @submit="onProjectConfigSubmit"></ProjectDbConfigDialog>
    <SelectSfProjectDialog ref="selectSfProjectDialogRef" @refresh="getTableData"></SelectSfProjectDialog>
  </TableLayout>
</template>

<script>
import { SfProjectService,SfProjectConfigService,GenExtendService } from '@/services'
import { SfProjectExtendService } from '@/services'
import { QueryConditionBuilder } from '@/utils/queryConditionBuilder'
import ProjectDialog from './components/ProjectDialog.vue'
import ProjectTable from './components/ProjectTable.vue'
import ProjectQuery from './components/ProjectQuery.vue'
import ProjectConfigDialog from './components/ProjectConfigDialog.vue'
import ProjectDbConfigDialog from './components/ProjectDbConfigDialog.vue'
import SelectSfProjectDialog from './components/SelectSfProjectDialog.vue'
import { downloadFile } from '@/utils/fileUtil'
import routesConstant from '@/router/routesConstant'
export default {
  name: 'Project',
  components: {
    ProjectTable,
    ProjectQuery,
    ProjectDialog,
    ProjectConfigDialog,
    ProjectDbConfigDialog,
    SelectSfProjectDialog

  },
  data() {
    return {
      tableData: [],
      queryForm: {},
      total: 0,
      pageInfo: {
        page: 1,
        rows: 20,
      },
      multipleSelection: [],
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    pageInfo: {
      handler() {
        this.getTableData()
      },
      deep: true,
    },
  },
  methods: {
    onOpen(row){
      this.$router.push({
        path:routesConstant.GEN_PAGE_DESIGN.path,
        query:{
          projectId:row.projectId
        }
      })
    },
    onSyncUpdate(row){},
    async onDownload(){
      const file = await GenExtendService.genSfProjectByProjectId(this.projectId)
      downloadFile(file)
    },
    async onProjectConfigSubmit(formData){
      await SfProjectConfigService.saveSfProjectConfig(formData)
      this.$message.success('操作成功')
    },
    init() {
      this.getTableData()
    },
    // 多选
    onSelectionChange(val) {
      this.multipleSelection = val
    },
    // 查询
    onQuery() {
      this.getTableData()
    },
    // 重置
    onReset() {
      Object.keys(this.queryForm).forEach((key) => {
        this.queryForm[key] = ''
      })
      // pageInfo修改会触发查询功能
      this.pageInfo = { page: 1, rows: 20 }
    },
    // 新增
    onAdd() {
      this.$refs.projectDialogRef.show()
    },
    // 编辑
    onEdit(row) {
      this.$refs.projectDialogRef.show(row)
    },
    // 数据库配置
    async onDbConfig(row){
      const projectConfig = await this.getProjectConfigInfo(row)
      this.$refs.projectDbConfigDialogRef.show(projectConfig)
    },
    // 项目配置
    async onProjectConfig(row){
      const projectConfig = await this.getProjectConfigInfo(row)
      this.$refs.projectConfigDialogRef.show(projectConfig)
    },
    async getProjectConfigInfo(row){
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bindProject',row.projectId)
      const { data } = await SfProjectConfigService.querySfProjectConfig(queryCondition)
      if(!data.length){
        return this.$message.warning('当前项目暂时没有配置项')
      }
      return data[0]

    },
    // 删除
    async onDelete(row) {
      try {
        await this.$tools.confirm('请确认是否删除？')
        const { code } = await this.onDeleteAPI(row.projectId)
        if (code === 200) this.$tools.message('删除成功')
        this.getTableData()
      } catch (e) {
        if (e == 'cancel') return this.$tools.message('已取消删除', { type: 'info' })
        console.error('删除失败', e)
      }
    },
    // 批量删除
    async onBatchDelete() {
      const ids = this.multipleSelection.map((item) => item.projectId)
      if (!ids.length) {
        return this.$message.warning('请先选择需要删除的内容')
      }
      try {
        await this.$tools.confirm('请确认是否删除？')
        const { code } = await this.onBatchDeleteAPI(ids)
        if (code === 200) this.$tools.message('删除成功')
        this.getTableData()
      } catch (e) {
        if (e == 'cancel') return this.$tools.message('已取消删除', { type: 'info' })
        console.error('删除失败', e)
      }
    },
    // 同步
    onSyncSfProject(){
      this.$refs.selectSfProjectDialogRef.show()
    },
    // 处理query组件触发的方法
    onEvent(type) {
      switch (type) {
        case 'query':
          this.onQuery()
          break
        case 'reset':
          this.onReset()
          break
        case 'add':
          this.onAdd()
          break
        case 'batchDelete':
          this.onBatchDelete()
          break
        case 'onSync':
          this.onSyncSfProject()
          break
        default:
          console.log('不支持的方法类型')
          break
      }
    },
    async getTableData() {
      const queryCondition = QueryConditionBuilder.getInstance(this.pageInfo.page, this.pageInfo.rows)
      Object.keys(this.queryForm).forEach((key) => {
        if (this.queryForm[key] || this.queryForm[key] == 0) {
          queryCondition.buildLikeQuery(key, this.queryForm[key])
        }
      })
      const { data } = await this.onQueryListAPI(queryCondition)
      this.tableData = data.data
      this.total = data.totalCount
    },
    async onSubmit(formData) {
      try {
        await this.onSaveAPI(formData)
        this.getTableData()
        this.$message.success('操作成功')
      } catch (error) {
        this.$message.error('操作失败，请联系管理员或者重试')
      }
    },
    // 查询列表API
    async onQueryListAPI(queryCondition) {
      return await SfProjectService.querySfProject(queryCondition)
    },
    // 删除API
    async onDeleteAPI(id) {
      return await this.onBatchDeleteAPI([id])
    },
    // 批量删除API
    async onBatchDeleteAPI(ids) {
      return await SfProjectService.deleteSfProjectBatch(ids)
    },
    // 保存API
    async onSaveAPI(param) {
      return await SfProjectExtendService.saveProject(param)
    },
  },
}
</script>

<style lang="less" scoped>
</style>
