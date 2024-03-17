<template>
  <div class="common-page" ref="tableRef">
    <el-table :data="tableData" :height="tableHeight" size="mini" border style="width: 100%" v-bind="$attrs" v-on="$listeners">
      <el-table-column type="selection" align="center" label="序号" width="80"> </el-table-column>
      <el-table-column type="index" label="序号" width="60px" align="center"> </el-table-column>
      <el-table-column prop="projectCode" align="center" label="项目编码"></el-table-column>
      <el-table-column prop="projectName" align="center" label="项目名称"></el-table-column>
      <el-table-column prop="shortName" align="center" label="项目简称"></el-table-column>
      <el-table-column prop="remark" align="center" label="备注"></el-table-column>
      <el-table-column prop="projectDescription" align="center" label="项目描述"></el-table-column>
      <el-table-column prop="systemName" align="center" label="系统名称"></el-table-column>
      <el-table-column prop="systemCode" align="center" label="系统标识"></el-table-column>
      <el-table-column prop="sort" align="center" label="排序"></el-table-column>
      <el-table-column label="操作" width="380">
        <template slot-scope="{ row }">
          <el-button plain type="primary" size="mini" @click="onDbConfig(row)">数据库配置</el-button>
          <el-button plain type="primary" size="mini" @click="onProjectConfig(row)">项目配置</el-button>
          <el-button plain type="primary" icon="el-icon-edit" size="mini" @click="onEdit(row)">编辑</el-button>
          <el-button plain type="danger" icon="el-icon-delete" size="mini" @click="onDelete(row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper" ref="paginationRef">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.page"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageInfo.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectTable',
  props: {
    tableData: {},
    total: {},
    pageInfo: {},
  },
  data() {
    return {
      tableHeight: '500px',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setHeight()
    })
  },
  methods: {
    setHeight() {
      this.tableHeight = this.$refs.tableRef.offsetHeight - this.$refs.paginationRef.offsetHeight + 'px'
    },
    onDbConfig(row) {
      this.$emit('onDbConfig', row)
    },
    onProjectConfig(row) {
      this.$emit('onProjectConfig', row)
    },
    onEdit(row) {
      this.$emit('onEdit', row)
    },
    onDelete(row) {
      this.$emit('onDelete', row)
    },
    handleSizeChange(rows) {
      this.pageInfo.rows = rows
    },
    handleCurrentChange(page) {
      this.pageInfo.page = page
    },
  },
}
</script>

<style lang="less" scoped>
.pagination-wrapper {
  text-align: right;
}
.el-button + .el-button {
  margin-left: 10px !important;
}
</style>
