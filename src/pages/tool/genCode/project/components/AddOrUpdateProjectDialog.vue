<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="名称" prop="projectName">
          <el-input v-model="formData.projectName"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
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
import { SfProjectService } from '@/services'
export default {
  data() {
    return {
      dialogTitle: '添加/更新项目',
      dialogVisible: false,
      dialogWidth: '700px',
      formData: {
        projectName: '',
        code: '',
        sort: 0,
      },
      formRules: {
        projectName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await SfProjectService.saveSfProject(this.formData)
          this.$emit('refresh',data)
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
