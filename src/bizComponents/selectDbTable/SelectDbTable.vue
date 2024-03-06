<template>
  <div class="select-db-table">
    <span style="font-size:14px;font-weight: bold;">{{title}}：</span>
    <el-select v-model="currentValue" filterable placeholder="请选择" @change="onChange">
      <el-option v-for="item in tableList" :key="item.name" :label="item.comment" :value="item.name">
        <span :title="item.comment" style="float: left;max-width:150px;overflow: hidden;text-overflow: ellipsis;">{{
      item.comment }}</span>
        <span :title="item.name"
          style="float: right; color: #8492a6; font-size: 12px;max-width:100px;overflow: hidden;text-overflow: ellipsis;">{{
      item.name }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { SfProjectExtendService } from "@/services";
export default {
  props: {
    projectId: {},
    sourceList: {},
    title:{
      type:String,
      default:'数据库表'
    }
  },
  watch: {
    projectId: {
      handler(newValue) {
        if (newValue) {
          this.getTableList(newValue)
        }
      },
      immediate: true
    },
    sourceList(newValue) {
      if (newValue?.length) {
        this.currentValue = ''
        this.tableList = newValue
        this.setDefault(newValue)
      }
    },
  },
  data() {
    return {
      tableList: [],
      currentValue: ''
    }
  },
  methods: {
    setDefault(list) {
      if (!this.currentValue && list?.length) {
        this.currentValue = list[0].name
        this.onChange(this.currentValue)
      }
    },
    async getTableList(projectId) {
      const { data } = await SfProjectExtendService.getTableByProjectId(projectId)
      this.tableList = data
      this.setDefault(data)
    },
    onChange(value) {
      this.$emit('onChange', value)
    }
  },
}
</script>

<style lang="less" scoped>
.select-db-table {
  width: fit-content;
  padding: 5px;
  border: 1px dashed #aaa;
  display: flex;
  align-items: center;

  ::v-deep {
    .el-input__inner {
      min-width: 280px;
    }
  }
}
</style>
