<template>
  <base-dialog :title="title" :visible.sync="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <el-form ref="formRef" :model="formData" :rules="formDataRules" label-width="auto" size="small">
      <el-form-item label="接口前缀" prop="projectParam.prefix">
        <el-input v-model.trim="formData.projectParam.prefix" placeholder="接口前缀 eg:base/api"></el-input>
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
  name: 'ProjectConfigDialog',
  data() {
    return {
      dialogWidth: '740px',
      dialogVisible: false,
      title: '编辑项目配置',
      formData: {
        projectParam: {
          prefix:''
        },
      },
      formDataRules: {
        "projectParam.prefix": [{ required: true, message: '请输入接口前缀', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async show(row) {
      if(row){
        this.formData = {
          ...row,
          projectParam:row.projectParam?JSON.parse(row.projectParam):{
            prefix:''
          }
        }
        this.dialogVisible = true
      }else{
        this.$message.warning("暂无数据")
      }
    },
    onDialogClose() {
      this.resetFormData()
      this.dialogVisible = false
    },
    resetFormData() {
      this.formData = {
        projectParam: {
          prefix:''
        },
      }
    },
    async onSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.$emit('submit', { ...this.formData,projectParam:JSON.stringify(this.formData.projectParam) })
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
