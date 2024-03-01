<template>
  <div class="common-page project-list">
    <QueryForm></QueryForm>
    <ProjectTable :tableData="tableData"></ProjectTable>
  </div>
</template>

<script>
import QueryForm from './components/QueryForm'
import ProjectTable from './components/ProjectTable'
export default {
  components: {
    QueryForm,
    ProjectTable,
  },
  data() {
    return {

      tableData: [
        {
          name: '项目名称',
          aliasName: '简称',
          code: '项目标识',
          remark: '备注',
          descript: '描述',
        },
      ],
    }
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
