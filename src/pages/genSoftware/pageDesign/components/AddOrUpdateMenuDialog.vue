<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="类型" prop="menuType">
          <el-radio-group v-model="formData.menuType" @input="onChangeParentId">
            <el-radio label="module">模块</el-radio>
            <el-radio label="page">页面</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属上级" prop="parentId">
          <el-select v-model="formData.parentId" filterable clearable placeholder="请选择所属上级" @change="onChangeParentId">
            <el-option v-for="item in moduleList" :key="item.menuId" :label="item.menuName" :value="item.menuId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="menuName">
          <el-input v-model="formData.menuName"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="menuCode">
          <el-row >
            <el-col :span="20">
              <el-input v-model="formData.menuCode"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button @click="onTranslate" :loading="loading" :disabled="!formData.menuName">自动识别</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input v-model="formData.sort"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <el-button size="mini" @click="onDialogClose" style="margin-right: 10px">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSubmit('formRef')">确 定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { SfMenuService,TranslatorExtendService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import * as changeCase from 'change-case'
export default {
  props: {
    projectId: {},
  },
  data() {
    return {
      dialogTitle: '添加/更新页面',
      dialogVisible: false,
      dialogWidth: '700px',
      menuList:[],
      moduleList:[],
      formData: {
        menuType: 'module',
        parentId: '',
        menuName: '',
        menuCode: '',
        sort: 0,
      },
      formRules: {
        menuName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        menuType: [{ required: true, message: '请选择类别', trigger: 'change' }],
        menuCode: [{ required: true, message: '请输入标识', trigger: 'blur' }],
      },
      loading:false
    }
  },
  methods: {
    async show() {
      this.dialogVisible = true
      await this.getMenuList()
    },
    async getMenuList(){
      this.menuList = []
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bind_project', this.projectId)
      queryCondition.buildAscSort('sort')
      const { data } = await SfMenuService.querySfMenu(queryCondition)
      this.menuList = data
      this.moduleList = this.menuList.filter(item=>item.menuType == 'module')
    },
    onChangeParentId(value){
      // 只有新增才会存在这种情况 修改则不会出发
      const { menuType,parentId } = this.formData
      const hasCurrentValue = this.menuList.find(item=>item.id == value)
      const currentParent = hasCurrentValue?value:parentId
      this.formData.sort = this.menuList.filter(item=>item.parentId == currentParent && item.menuType == menuType)?.length + 1 || 1
    },
    async onTranslate(){
      this.loading = true
      try {
        const {data} = await TranslatorExtendService.getResult(this.formData.menuName)
        this.formData.menuCode = changeCase.camelCase(data)
      } catch (error) {
        console.log(error);
      }finally{
        this.loading = false
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.formData.menuType == 'page') {
            this.formData.param = {}
          }
          this.formData.bindProject = this.projectId
          const { data } = await SfMenuService.saveSfMenu(this.formData)
          this.$emit('refresh', data)
          this.onDialogClose()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onReset() {
      this.$refs.formRef.resetFields()
    },
    onDialogClose() {
      this.onReset()
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="less" scoped></style>
