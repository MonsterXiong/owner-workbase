<template>
  <div class="field-table-comp" ref="fieldTableRef">
    <header ref="headerRef">表格内容</header>
    <el-table :height="tableHeight"  :data="tableData" border stripe>
      <el-table-column prop="Field" label="字段名" align="center"></el-table-column>
      <!-- <el-table-column prop="Type" label="数据类型" width="150" align="center"></el-table-column> -->
      <el-table-column prop="_type" label="数据类型" width="120" align="center"></el-table-column>
      <el-table-column prop="_length" label="长度"  align="center"></el-table-column>
      <el-table-column prop="Null" label="允许为空" width="80" align="center"></el-table-column>
      <el-table-column prop="Default" label="默认值" width="120" align="center"></el-table-column>
      <el-table-column prop="Comment" label="注释"></el-table-column>
      <el-table-column prop="Key" label="是否主键" width="50" align="center"></el-table-column>
      <!-- <el-table-column prop="bindDatabasePool" label="数据源" width="180">
          <template slot-scope="scope">
            {{ getLableByValue(databasePoolOption, scope.row.bindDatabasePool) }}
          </template>
        </el-table-column>-->

      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">测试连接性</el-button> -->
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看表设计</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看数据</el-button>-->
          <!-- 增字段 -->
          <!-- 增删改数据 -->
          <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="onDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: '500px'
    }
  },
  props: {
    tableData: {
    },
  },
  mounted () {
    this.$nextTick(()=>{
      this.tableHeight =  this.$refs.fieldTableRef.offsetHeight - this.$refs.headerRef.offsetHeight + 'px'
    });
  },
  methods: {
    onEdit() { },
    onDelete() { }
  },
}
</script>

<style lang="less" scoped>
.field-table-comp {
  height: 100%;
  header {
    background-color: @layout-bg-color;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: @font-color--primary;
    border-bottom: 1px @border-type @border-color--primary;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>
