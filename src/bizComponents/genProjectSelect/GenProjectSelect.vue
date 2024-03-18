<template>
  <div class="gen-project-select">
    <el-select v-model="projectId" filterable placeholder="请选择项目" @change="onChangeProject">
      <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"></el-option>
    </el-select>
    <template v-if="download">
      <span class="add-icon" @click="onDownload" title="下载完整项目代码"><i class="el-icon-download"></i></span>
    </template>
    <template v-if="add">
      <span class="add-icon" @click="onAdd"><i class="el-icon-plus"></i></span>
    </template>
  </div>
</template>

<script>
import { SfProjectService, GenExtendService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import { downloadFile } from '@/utils/fileUtil'

export default {
  props: {
    download: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
  },
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
    },
  },
  methods: {
    async onDownload() {
      const file = await GenExtendService.genSfProjectByProjectId(this.projectId)
      downloadFile(file)
    },
    refresh() {
      this.getProjectList()
    },
    setCurrentKey(projectId) {
      this.projectId = projectId
    },
    onChangeProject(projetcId) {
      this.$emit('onChange', projetcId)
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

.gen-project-select {
  display: flex;
  padding: 0 5px;
  width: 100%;
}
</style>
