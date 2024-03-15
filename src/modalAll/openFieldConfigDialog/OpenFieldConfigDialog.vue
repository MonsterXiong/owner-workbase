<template>
  <el-drawer :visible.sync="visible" direction="rtl" custom-class="demo-drawer" ref="drawer" @close="onClose" :show-close="false" :withHeader="false">
    <div class="demo-drawer__content">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="label" prop="label">
          <el-input v-model="formData.label"></el-input>
        </el-form-item>
        <!-- <el-form-item label="placeholder" prop="placeholder">
          <el-input v-model="formData.placeholder"></el-input>
        </el-form-item> -->

        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.configParam.type" @change="onChangeType">
            <el-radio label="mock">mock数据</el-radio>
            <el-radio label="enum">枚举</el-radio>
            <el-radio label="interface">接口对象</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="formData.configParam.type == 'enum'">
          <!-- 选择枚举列表 -->
          <el-form-item label="枚举类别">
            <el-select v-model="formData.configParam.param.enumCategory">
              <el-option v-for="item in enumOption" :key="item.enumCategoryId" :value="item.enumCategoryCode" :label="item.enumCategoryName"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <!-- 接口类别 -->
        <template v-if="formData.configParam.type == 'interface'">
          <SelectSingleDb isRemote :formData.sync="dbFormData" ref="selectSingDbRef" type="list" :projectId="projectId"></SelectSingleDb>
        </template>

        <el-form-item label="是否默认值" prop="hasDefaultValue">
          <el-switch v-model="formData.configParam.hasDefaultValue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <template v-if="formData.configParam.hasDefaultValue">
          <el-form-item label="defaultValue" prop="defaultValue">
            <el-input v-model="formData.configParam.defaultValue"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="是否多选" prop="hasMuiltiple">
          <el-switch v-model="formData.configParam.hasMultiple" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否搜索" prop="hasFilterable">
          <el-switch v-model="formData.configParam.hasFilterable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="是否清空" prop="hasClearable">
          <el-switch v-model="formData.configParam.hasClearable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" style="margin-right: 10px" @click="onClose">取 消</el-button>
          <el-button size="mini" type="primary" @click="onSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { EMIT_EVENT_TYPE } from '@/common/constant/emitEventType'
import { SfEnumCategoryService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import SelectSingleDb from '@/bizComponents/selectSingleDb/SelectSingleDb.vue'
export default {
  components: {
    SelectSingleDb,
  },
  data() {
    return {
      title: '组件配置',
      visible: false,
      dialogWidth: '700px',
      activeName: 'first',
      projectId: '',
      dbFormData: {
        tableName: '',
        fieldList: {},
      },
      formData: {
        configParam: {
          type: '',
          param: {},
          hasDefaultValue: false,
          defaultValue: '',
          hasMultiple: false,
        },
      },
      enumOption: [],
      rules: {},
    }
  },
  mounted() {
    this.$emitter.on(EMIT_EVENT_TYPE.OPEN_FIELD_CONFIG_DIALOG, this.show)
  },
  methods: {
    async getEnumCategoryList() {
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bindProject', this.projectId)
      const { data } = await SfEnumCategoryService.querySfEnumCategory(queryCondition)
      this.enumOption = data
    },
    onSubmit() {
      if (this.formData.configParam.type == 'interface') {
        const dbData = this.$refs.selectSingDbRef.getData()

        console.log('dbData', dbData)

        const param = {
          tableName: dbData.tableCode,
          labelKey: dbData.fieldList.displayName,
          valueKey: dbData.fieldList.uniqueCode,
        }
        // this.$set(this.formData.configParam, 'param', param)
        this.formData.configParam.param = param
        this.row.configParam = {...this.formData.configParam}
        this.row.label = this.formData.label
      }
    },
    async onChangeType(value) {
      let param = {}
      if (value == 'enum') {
        param = {
          enumCategory: '',
        }
        await this.getEnumCategoryList()
      }
      if (value == 'interface ') {
        param = {
          tableName: '',
          valueKey: '',
          labelKey: '',
        }
      }
      if (value == 'mock') {
        //
        this.formData.configParam.param = {}
      }
      this.formData.configParam.param = param
    },
    async show(paramData) {
      if (paramData) {
        const { row, projectId } = paramData
        this.projectId = projectId
        await this.getEnumCategoryList()
        console.log('row',row);

        if (row) {
          this.row = paramData.row
          this.formData = {...row}
          if (this.formData?.configParam.type == 'interface') {
            const { param, data } = this.formData?.configParam
            this.dbFormData = {
              tableCode: param.tableName,
              fieldList: {
                uniqueCode: param.valueKey,
                displayName: param.labelKey,
              },
            }
          }
        }
      }
      this.visible = true
    },
    resetFormData() {
      this.formData= {
        configParam: {
          type: 'mock',
          param: {},
          hasDefaultValue: false,
          defaultValue: '',
          hasMultiple: false,
        },
      }
    },
    onClose() {
      console.log('xxxx-close');

      this.visible = false
      this.resetFormData()
    },
  },
}
</script>

<style lang="less" scoped></style>
