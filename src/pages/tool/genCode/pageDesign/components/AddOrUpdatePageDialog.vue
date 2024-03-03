<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="page">页面</el-radio>
            <el-radio label="module">模块</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item label="所属菜单" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择所属菜单">
              <el-option v-for="item in pageList" :key="item.pageId" :label="item.pageName"
                :value="item.pageId"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="名称" prop="pageName">
          <el-input v-model="formData.pageName"></el-input>
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
    pageList: {},
    projectId:{}
  },
  data() {
    return {
      dialogTitle: '添加/更新页面',
      dialogVisible: false,
      dialogWidth: '700px',
      formData: {
        type: 'page',
        parentId:'',
        pageName: '',
        code: ''
      },
      formRules: {
        pageName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'change' }
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
          if (this.formData.type == 'page') {
            this.formData.param = {}
          }
          this.formData.bindProject = this.projectId
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
