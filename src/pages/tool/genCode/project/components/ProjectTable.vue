<template>
  <div class="common-page project-table">
    <div class="table-wrapper">
      <el-table :data="tableData" height="100%" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" align="center">
          <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.projectName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="projectCode" label="项目标识" align="center"></el-table-column>
        <el-table-column prop="shortName" label="简称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="descript" label="描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="onConfig(scope.row)">配置</el-button>
            <el-button size="mini" type="danger" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="pageInfo.pageNumber"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {},
    total: {},
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageNumber: 1,
          pageSize: 10,
        }
      },
    },
  },
  data() {
    return {
      multipleSelection: [],
    }
  },
  methods: {
    onEdit(row) {
      this.$emit('onEdit', row)
    },
    onConfig(row) {
      this.$emit('onConfig', row)
    },
    onDelete(row) {
      this.$emit('onDelete', row)
    },
    onChangePageInfo(pageInfo) {
      this.$emit('update:pageInfo', pageInfo)
    },
    onSizeChange(val) {
      this.onChangePageInfo({ ...this.pageInfo, pageSize: val })
    },
    onCurrentChange(val) {
      this.onChangePageInfo({ ...this.pageInfo, pageNumber: val })
    },
    onSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style lang="less" scoped>
.project-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  ::v-deep {
    .el-button + .el-button {
      margin-left: 10px !important;
    }
  }
  .table-wrapper {
    height: calc(100% - 32px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border: 1px dashed #356191;
    border-top: none;
  }

  .pagination-wrapper {
    padding: 0 10px;
    text-align: end;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
