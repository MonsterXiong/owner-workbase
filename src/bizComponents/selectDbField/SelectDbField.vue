<template>
  <div class="select-db-field">
    <span style="font-size:14px;font-weight: bold;">{{title}}：</span>
    <el-select v-model="currentValue" filterable placeholder="请选择" @change="onChange">
      <el-option v-for="item in fieldList" :key="item.Field" :label="item.Comment" :value="item.Field">
        <span :title="item.Comment" style="float: left;max-width:150px;overflow: hidden;text-overflow: ellipsis;">{{
      item.Comment }}</span>
        <span :title="item.Field"
          style="float: right; color: #8492a6; font-size: 12px;max-width:100px;overflow: hidden;text-overflow: ellipsis;">{{
      item.Field }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { SfProjectExtendService } from "@/services";
export default {
  props: {
    projectId: {},
    tableName: {},
    sourceList: {},
    title:{
      type:String,
      default:'数据字段'
    }
  },
  watch: {
    tableName: {
      handler(newValue) {
        if (newValue) {
          this.currentValue = ''
          this.getFieldList(newValue)
        }
      },
      immediate: true
    },
    sourceList(newValue) {
      if (newValue?.length) {
        this.currentValue = ''
        this.fieldList = newValue
        // this.setDefault(newValue)
      }
    },
  },
  data() {
    return {
      fieldList: [],
      currentValue: ''
    }
  },
  methods: {
    setDefault(list) {
      if (!this.currentValue && list?.length) {
        this.currentValue = list[0].Field
        this.onChange(this.currentValue)
      }
    },
    async getFieldList(tableName) {
      const { data } = await SfProjectExtendService.getFieldByProjectId(this.projectId, tableName)
      this.fieldList = data
      this.setDefault(data)
    },
    onChange(value) {
      this.$emit('onChange', value)
    }
  },
}
</script>

<style lang="less" scoped>
.select-db-field {
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
