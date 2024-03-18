<template>
  <el-form :model="queryForm" size="small" :inline="true" class="query-form-container">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model.trim="queryForm.projectName" placeholder="请输入项目名称"></el-input>
    </el-form-item>
    <el-form-item label="项目简称" prop="shortName">
      <el-input v-model.trim="queryForm.shortName" placeholder="请输入项目简称"></el-input>
    </el-form-item>
    <el-form-item>
      <div class="btn-container">
        <el-button type="primary" icon="el-icon-search" @click="onEvent('query')">查询</el-button>
        <el-button icon="el-icon-refresh" @click="onEvent('reset')">重置</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="onEvent('add')">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="onEvent('batchDelete')">批量删除</el-button>
        <el-button size="mini" plain type="primary" @click="onEvent('onSync')">同步</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ProjectQuery',
  props: {
    queryForm: {},
  },
  methods: {
    onEvent(type) {
      this.$emit('onEvent', type)
    },
  },
}
</script>

<style lang="less" scoped>
.query-form-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .el-form-item {
    margin-bottom: 0;
  }
  .el-button + .el-button{
    margin-left:10px !important
  }
}
</style>
