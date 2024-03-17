<template>
  <base-dialog :title="title" :visible.sync="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <el-form ref="formRef" :model="formData" :rules="formDataRules" label-width="auto" size="small">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model.trim="formData.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目编码" prop="projectCode">
        <el-input v-model.trim="formData.projectCode" placeholder="请输入项目编码"></el-input>
      </el-form-item>
      <el-form-item label="项目简称" prop="shortName">
        <el-input v-model.trim="formData.shortName" placeholder="请输入项目简称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="formData.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="项目描述" prop="projectDescription">
        <el-input v-model.trim="formData.projectDescription" placeholder="请输入项目描述"></el-input>
      </el-form-item>
      <el-form-item label="系统名称" prop="systemName">
        <el-input v-model.trim="formData.systemName" placeholder="请输入系统名称"></el-input>
      </el-form-item>
      <el-form-item label="系统标识" prop="systemCode">
        <el-input v-model.trim="formData.systemCode" placeholder="请输入系统标识"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="formData.sort" placeholder="请输入排序"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button size="mini" @click="onDialogClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </base-dialog>
</template>

<script>
export default {
  name: 'ProjectDialog',
  data() {
    return {
      dialogWidth: '740px',
      dialogVisible: false,
      title: '新增',
      formData: {
          projectCode : '',
          projectName : '',
          shortName : '',
          remark : '',
          projectDescription : '',
          systemName : '',
          systemCode : '',
          sort:""
      },
      formDataRules: {
        projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async show(row) {
      this.title = row?.projectId ? '编辑项目' : '新增项目'
      if (row) {
        this.formData = { ...row }
      }
      this.dialogVisible = true
    },
    onDialogClose() {
      this.resetFormData()
      this.dialogVisible = false
    },
    resetFormData() {
      this.formData = {
        projectName: '',
      }
    },
    async onSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.$emit('submit', { ...this.formData })
          this.onDialogClose()
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.el-button + .el-button {
  margin-left: 10px !important;
}
</style>
