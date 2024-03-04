<template>
  <div class="gen-project-select">
    <el-select v-model="projectId" filterable placeholder="请选择项目" @change="onChangeProject">
      <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName"
        :value="item.projectId"></el-option>
    </el-select>
    <span class="add-icon" @click="onAdd"><i class="el-icon-plus"></i></span>
  </div>
</template>

<script>
import { SfProjectService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
export default {
  data() {
    return {
      projectId: '',
      projectList: [],
    }
  },
  mounted() {
    this.getProjectList()
  },
  watch: {
    projectId(newValue, oldValue) {
      this.onChangeProject(newValue)
    }
  },
  methods: {
    refresh(){
      this.getProjectList()
    },
    setCurrentKey(projectId){
      this.projectId = projectId
    },
    onChangeProject(projetcId){
      this.$emit('onChange',projetcId)
    },
    onAdd() {
      this.$emit('onAdd')
    },
    async getProjectList() {
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildAscSort('sort')
      const { data } = await SfProjectService.querySfProject(queryCondition)
      this.projectList = data
      if (!this.projectId && this.projectList.length) {
        this.setCurrentKey(this.projectList[0].projectId)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.add-icon {
  margin-left: auto;
  cursor: pointer;
}

.gen-project-select{
  display: flex;
  padding: 0 5px;
  width:100%
}
</style>
