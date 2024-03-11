<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page page-detail">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="类型" prop="menuType">
          <el-radio-group v-model="formData.menuType">
            <el-radio label="page">页面</el-radio>
            <el-radio label="module">模块</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属上级" prop="parentId">
          <el-select v-model="formData.parentId" filterable clearable placeholder="请选择所属上级">
            <el-option v-for="item in menuList" :key="item.menuId" :label="item.menuName" :value="item.menuId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="menuName">
          <el-input v-model="formData.menuName"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="menuCode">
          <el-input v-model="formData.menuCode"></el-input>
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
import { SfMenuService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'

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
      formData: {
        menuType: 'page',
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
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.getMenuList()
    },
    async getMenuList(){
      this.menuList = []
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bind_project', this.projectId)
      queryCondition.buildAscSort('sort')
      const { data } = await SfMenuService.querySfMenu(queryCondition)
      this.menuList = data
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
