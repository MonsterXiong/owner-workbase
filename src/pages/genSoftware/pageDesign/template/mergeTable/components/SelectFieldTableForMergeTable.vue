<template>
  <div class="common-page">
    <el-table :data="tableData" style="width: 100%" height="100%">
      <el-table-column label="名称" prop="label" ></el-table-column>
      <el-table-column label="属性" >
        <template slot-scope="{row}">
          <el-tag size="medium">{{ row.prop }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" >
        <template slot-scope="{row}">
          <el-select v-model="row.displayType" placeholder="请选择类型">
            <el-option v-for="item in displayTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="是否主键" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isPrimaryKey" active-color="#13ce66" inactive-color="#ff4949"
            @change="onChangePrimaryKey(row, $event)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isHidden" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="搜索项" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isQuery" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="表单项" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isForm" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否必填" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isRequired" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否合并" align="center" >
        <template slot-scope="{ row }">
          <el-switch v-model="row.isMerge" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onConfig(scope.$index, scope.row)">配置</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { SfProjectExtendService } from "@/services";
export default {
  props: {
    projectId: {},
    tableName: {},
    isRemote: {
      type:Boolean,
      default:true
    },
    sourceList:{}
  },
  data() {
    return {
      tableData: [],
      displayTypeOption:[{
        value:'input',
        label:'文本框'
      },{
        value:'inputNumber',
        label:'数字文本框'
      },{
        value:'select',
        label:'下拉框'
      },{
        value:'multipleSelect',
        label:'多选下拉框'
      },{
        value:'textarea',
        label:'文本域'
      },{
        value:'radio',
        label:'单选框'
      },{
        value:'datetime',
        label:'日期时间'
      },{
        value:'date',
        label:'日期'
      },{
        value:'time',
        label:'时间'
      },{
        value:'checkbox',
        label:'多选框'
      },{
        value:'switch',
        label:'开关'
      },{
        value:'colorPicker',
        label:'颜色选择器'
      },{
        value:'rate',
        label:'评分'
      },{
        value:'slider',
        label:'滑块'
      },{
        value:'image',
        label:'图片'
      }],
      fieldList:[]
    }
  },
  watch: {
    tableName: {
      async handler(newValue) {
        if (newValue) {
          if(!this.sourceList?.length){
            await this.getFieldList(newValue)
            this.initTemplate(this.fieldList)
          }
        }
      },
      immediate: true
    },
    sourceList(newValue) {
      if (newValue?.length) {
        this.tableData = newValue
      }
    },
  },
  methods: {
    initTemplate(data){
      this.tableData= data.map(item => {
        const { Field, Comment, Key, Null } = item
        const isPrimaryKey = Key == 'PRI'
        const isIncludeName = Field?.endsWith('name')
        const isAllowNull = Null == 'YES'
        return {
          prop: Field,
          label: Comment,
          displayType: 'input',
          isQuery: isIncludeName,
          isForm: isIncludeName,
          isRequired: !isAllowNull,
          isHidden: isPrimaryKey || !isIncludeName,
          isPrimaryKey,
          isMerge:false,
          param: {},
          configParam: {}
        }
      })
    },
    async getFieldList(tableName) {
      const { data } = await SfProjectExtendService.getFieldByProjectId(this.projectId, tableName)
      this.fieldList = data
    },
    onChangePrimaryKey(row, value) {
      if (!value) {
        row.isPrimaryKey = true
        return this.$message.warning('必须存在唯一主键')
      }
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          isPrimaryKey: row.prop == item.prop ? true : false
        }
      })
    },
    getTableData() {
      return this.tableData
    },
    onConfig(index, row) {
      console.log(index, row);
    },
  }
}
</script>

<style lang="less" scoped>
.el-button+.el-button {
  margin-left: 10px !important
}
</style>
