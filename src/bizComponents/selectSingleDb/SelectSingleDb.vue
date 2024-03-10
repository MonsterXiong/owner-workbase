<template>
  <div class="select-single-db" >
    <el-form :model="currentFormData" :validate-on-rule-change="false" :rules="rules" label-position="left" label-width="auto" ref="formRef"  :class="{'inline-class':inLine}" :inline="inLine">
      <el-form-item :label="title" prop="tableName">
        <el-select v-model="currentFormData.tableName" filterable placeholder="请选择" @change="onChangeTable">
        <el-option v-for="item in tableList" :key="item.name" :label="`${item.comment}-${item.name}`" :value="item.name">
          <span :title="item.comment" style="float: left;max-width:150px;overflow: hidden;text-overflow: ellipsis;">{{
        item.comment }}</span>
          <span :title="item.name"
            style="float: right; color: #8492a6; font-size: 12px;max-width:100px;overflow: hidden;text-overflow: ellipsis;">{{
        item.name }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-for="field in currentFormData.fieldList" :key="field.key" :label="field.label" :prop="field.key">
      <el-select v-model="field.prop" filterable :placeholder="`请选择${field.label}`">
        <el-option v-for="item in fieldOption" :key="item.Field" :label="`${item.Comment}-${item.Field}`" :value="item.Field">
          <span :title="item.Comment" style="float: left;max-width:150px;overflow: hidden;text-overflow: ellipsis;">{{
        item.Comment }}</span>
          <span :title="item.Field"
            style="float: right; color: #8492a6; font-size: 12px;max-width:100px;overflow: hidden;text-overflow: ellipsis;">{{
        item.Field }}</span>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { SfProjectExtendService } from "@/services";
import {FIELD_COMPONENT_INFO,getSpecialFieldInfo} from './constant'
export default {
  props: {
    formData:{},
    projectId: {},
    dataList: {},
    fieldList:{},
    inLine:{
      type:Boolean,
      default:false
    },
    emptyRuleField:{
      type:Array,
      default:()=>[]
    },
    extendFieldKeyList:{
      type:Array,
      default:()=>[]
    },
    type:{
      type:String,
      // 树形  // 列表
      default:'default'
    },
    isRemote: {
      type: Boolean,
      default: false
    },
    isSetDefault: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '数据库表'
    },
    trigger:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    projectId: {
      handler(newValue) {
        if (newValue && this.isRemote) {
          this.getTableList(newValue)
        }
      },
      immediate: true
    },
    dataList(newValue) {
      if (newValue?.length && !this.isRemote) {
        this.currentTableName = ''
        this.tableList = newValue
      }
    },

    tableList(newValue){
      if(this.setDefault && newValue?.length){
        if (!this.currentTableName) {
          this.currentTableName = newValue[0].name
        }
      }
    },
    formData(){
      this.setCurrentData()
    }
  },
  computed: {
    isInline() {
      return this.data
    }
  },
  data() {
    return {
      tableList: [],
      currentTableName: '',
      fieldOption:[],
      currentFormData:{},
      rules:{},
    }
  },
  mounted () {
    this.setCurrentData()
    this.setRule()
  },
  methods: {
    setCurrentData(){
      let dataInfo = null
      if(this.formData){
        dataInfo =_.cloneDeep(this.formData)
      }
      let fieldInfo = FIELD_COMPONENT_INFO[this.type] || this.fieldList || []
      fieldInfo = [...fieldInfo,...this.extendFieldKeyList]
      const fieldList = fieldInfo?.map(item=>{
          return{
            ...item,
            prop:dataInfo?.fieldList[item?.key] || ''
          }
      }) || []
      this.currentFormData = {
        tableName:dataInfo?.tableCode || '',
        fieldList
      }
    },
    setRule(){
      const rules = {
        'tableName':[{ required: true, message: `请选择${this.title}`, trigger: 'blur' }]
      }
      this.currentFormData?.fieldList.forEach(field=>{
        if(!this.emptyRuleField.includes(field.key)){
          rules[field.key] = [{ required: true, message: `请选择${field.label}`, trigger: 'blur' }]
        }
      })
      this.rules = rules
    },
    async getTableList(projectId) {
      const { data } = await SfProjectExtendService.getTableByProjectId(projectId)
      this.tableList = data
    },
    resetFieldValue(value){
      const filedInfo=getSpecialFieldInfo(this.fieldOption)
      this.currentFormData.tableName = value
      this.currentFormData.fieldList.forEach(item=>{
        if(this.type == 'default'){
          item.prop=""
        }else {
          item.prop = filedInfo[item.key] || ''
        }
      })
    },
    async getFieldList(tableName) {
      const { data } = await SfProjectExtendService.getFieldByProjectId(this.projectId, tableName)
      return data
    },
    async onChangeTable(value){
      this.fieldOption = await this.getFieldList(value)
      this.resetFieldValue(value)
      if(this.trigger){
        this.$emit('onChangeTable',value)
      }
    },
    getData(){
      // this.$refs.formRef.validate((valid) => {
      //   if(valid){
          const {tableName,fieldList}= _.cloneDeep(this.currentFormData)
          const fieldInfo = {}
          fieldList.forEach(field => {
            fieldInfo[field.key] = field.prop
          })
          const formData = {
            tableCode:tableName,
            fieldList:fieldInfo
          }
          return formData
      //   }else{
      //     return false
      //   }
      // })

    }
  },
}
</script>

<style lang="less" scoped>
.select-single-db {
  width: fit-content;
  padding: 5px;
  display: flex;
  align-items: center;
  ::v-deep {
    .el-input__inner {
      min-width: 280px;
    }
    .el-form-item{
      padding: 5px;
      border: 1px dashed #999;
    }
    .el-form-item+.el-form-item{
      margin-top: 0;
    }
    .el-form-item__label{
      font-size:14px;
      font-weight: bold;
    }
    .inline-class{
      .el-form-item{
        padding: 5px;
        margin-bottom: 0;
      }
    }
  }

  .show-label{
    font-size:14px;
    font-weight: bold;
  }
}
</style>
