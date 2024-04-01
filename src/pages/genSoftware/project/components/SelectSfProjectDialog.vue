<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="项目" prop="projectId">
          <el-select v-model="formData.projectId" placeholder="请选择项目" clearable>
            <el-option v-for="item in projectList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
import { getProjectList } from '@/services/otherSystem.js'

export default {
  data() {
    return {
      dialogTitle: '选择需要同步的项目',
      dialogVisible: false,
      dialogWidth: '700px',
      projectList: [],
      formData: {
        projectId: '',
      },
      formRules: {
        projectId: [{ required: true, message: '请选择需要同步的软件工厂项目', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async show() {
      this.dialogVisible = true
      this.getProjectList()
    },
    async getProjectList() {
      try {
        const { data } = await getProjectList()
        this.projectList = data.map((item) => {
          const { projectId, projectName } = item
          return {
            ...item,
            label: projectName,
            value: projectId,
          }
        })
      } catch (error) {
        this.projectList = []
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$emit('sync', this.formData.projectId)
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
      this.dialogVisible = false
      this.onReset()
    },
  },
}
</script>

<style lang="less" scoped></style>
