<template>
  <base-dialog :title="title" :visible.sync="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <el-form ref="formRef" :model="formData" :rules="formDataRules" label-width="auto" size="small">
      <el-form-item label="主机名/IP" prop="configParam.host">
        <el-input v-model.trim="formData.configParam.host" placeholder="请输入主机名/IP"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="configParam.port">
        <el-input v-model.trim="formData.configParam.port" placeholder="请输入端口号"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="configParam.type">
        <el-input v-model.trim="formData.configParam.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <el-form-item label="用户" prop="configParam.username">
        <el-input v-model.trim="formData.configParam.username" placeholder="请输入用户"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="configParam.password">
        <el-input  v-model.trim="formData.configParam.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="库名" prop="configParam.database">
        <el-input  v-model.trim="formData.configParam.database" placeholder="请输入库名"></el-input>
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
  name: 'ProjectDbConfigDialog',
  data() {
    return {
      dialogWidth: '740px',
      dialogVisible: false,
      title: '编辑数据库配置',
      formData: {
        configParam:{
          host:'',
          port:'3306',
          type:'mysql',
          username:'',
          password:'',
          database:'',
        },
      },
      formDataRules: {
        "configParam.host": [{ required: true, message: '请输入主机名/IP', trigger: 'blur' }],
        "configParam.port": [{ required: true, message: '请输入端口', trigger: 'blur' }],
        "configParam.type": [{ required: true, message: '请输入类型', trigger: 'blur' }],
        "configParam.username": [{ required: true, message: '请输入账户', trigger: 'blur' }],
        "configParam.password": [{ required: true, message: '请输入密码', trigger: 'blur' }],
        "configParam.database": [{ required: true, message: '请输入库名', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async show(row) {
      if(row){
        this.formData = {
          ...row,
          configParam:row.configParam?JSON.parse(row.configParam):{
            host:'',
            port:'3306',
            type:'mysql',
            username:'',
            password:'',
            database:'',
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
        configParam:{
          host:'',
          port:'3306',
          type:'mysql',
          username:'',
          password:'',
          database:'',
        },
      }
    },
    async onSubmit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.$emit('submit', { ...this.formData,configParam:JSON.stringify(this.formData.configParam) })
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
