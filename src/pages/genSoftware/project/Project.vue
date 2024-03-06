<template>
  <div class="common-page project-list">
    <QueryForm></QueryForm>
    <ProjectTable :tableData="tableData" :pageInfo.sync="pageInfo" :total="total" @onDelete="onDelete"></ProjectTable>
  </div>
</template>

<script>
import QueryForm from './components/QueryForm'
import ProjectTable from './components/ProjectTable'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import { SfProjectService } from '@/services'
export default {
  components: {
    QueryForm,
    ProjectTable,
  },
  data() {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    }
  },
  watch: {
    pageInfo: {
      handler(newValue, oldValue) {
        this.getProjectList()
      },
      deep: true,
    },
  },
  mounted() {
    this.getProjectList()
  },
  methods: {
    async onDelete(row) {
      await SfProjectService.deleteSfProjectBatch([row.projectId])
      this.$message.success('操作成功')
      this.getProjectList()
    },
    async getProjectList() {
      const queryCondition = QueryConditionBuilder.getInstance(this.pageInfo.pageNumber, this.pageInfo.pageSize)
      queryCondition.buildAscSort('sort')
      const { data } = await SfProjectService.querySfProject(queryCondition)
      const { data: tableList, totalCount } = data
      this.tableData = tableList
      this.total = totalCount
      // if (!this.projectId && this.projectList.length) {
      //   this.projectId = this.projectList[0].projectId
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.project-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
