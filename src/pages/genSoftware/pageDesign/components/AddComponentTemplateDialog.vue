<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="添加类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="pageTemplate">页面模板</el-radio>
            <el-radio label="pageCategoryTemplate">页面模板类别</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="formData.type == 'pageTemplate'">
          <el-form-item label="类别" prop="categoryType">
            <el-select v-model="formData.categoryType" placeholder="请选择类别">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </template>

        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <el-button size="mini" @click="onDialogClose" style="margin-right:10px">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSubmit('formRef')">确 定</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import { CATEGORY_LIST } from '../../constant/pageCategoryList'
import {GenToolExtendService} from '@/services'

export default {
  data() {
    return {
      categoryList: CATEGORY_LIST,
      dialogTitle: '添加页面类别/模板',
      dialogVisible: false,
      dialogWidth: '700px',
      formData: {
        type: 'pageTemplate',
        categoryType:'',
        name: '',
        code: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        categoryType: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入标识', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.formData.type);
          if (this.formData.type == 'pageTemplate') {
            await GenToolExtendService.quickGenComponentTemplate(this.formData)
          } else  if (this.formData.type == 'pageCategoryTemplate'){
            await GenToolExtendService.quickGenCategoryType(this.formData)
          }
          this.onDialogClose()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onClick(pageItem) {
      this.currentActivePageType = pageItem.value
    },
    onReset() {
      this.$refs.formRef.resetFields();
    },
    onDialogClose() {
      this.dialogVisible = false
      this.onReset()
    }
  },
}
</script>

<style lang="less" scoped></style>
