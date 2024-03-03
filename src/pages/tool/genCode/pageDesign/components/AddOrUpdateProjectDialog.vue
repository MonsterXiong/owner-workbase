<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
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
export default {
  props: {
    pageList: {}
  },
  data() {
    return {
      dialogTitle: '添加/更新项目',
      dialogVisible: false,
      dialogWidth: '700px',
      formData: {
        name: '',
        code: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
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
          this.$emit('onSubmit',this.formData)
          this.onDialogClose()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
