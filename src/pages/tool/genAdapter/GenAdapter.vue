<template>
  <div style="display: flex; gap: 10px; height: 100%" class="layout-page">
    <div style="flex: 1">
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="auto" class="demo-dynamic">
        <el-form-item prop="type" label="适配器类型">
          <el-input v-model="formData.type" placeholder="page"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="适配器名称">
          <el-input v-model="formData.name" placeholder="graph"></el-input>
        </el-form-item>
        <el-form-item prop="componentName" label="组件类型">
          <el-input v-model="formData.componentName" placeholder="graph_general"></el-input>
        </el-form-item>
        <el-form-item prop="entrySuffixName" label="入口文件后缀">
          <el-input v-model="formData.entrySuffixName" placeholder="Graph"></el-input>
        </el-form-item>
        <el-row v-for="item in formData.element" :key="item.id" :gutter="20">
          <el-col :span="7">
            <el-form-item label="字段Key">
              <el-input v-model="item.field" placeholder="queryInfo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="要素Key">
              <el-input v-model="item.elementName" placeholder="queryList"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="要素信息">
              <el-input v-model="item.message" placeholder="查询列表信息"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="text-align: end">
            <el-button icon="el-icon-plus" circle @click="addElement" style="margin-right: 10px"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click.prevent="removeElement(item.id)"></el-button>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formRef')" style="margin-right: 5px">提交</el-button>
          <el-button @click="resetForm('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
      <div style="flex: 1; overflow: hidden">
        <el-input type="textarea" placeholder="请输入内容" v-model="json"> </el-input>
        <el-input type="textarea" placeholder="请输入内容" v-model="projectId" clearble> </el-input>
      </div>
      <div style="height: 50px; display: flex; justify-content: center; align-items: center; gap: 10px">
        <el-button type="primary" @click="parseJson">解析Json</el-button>
        <el-button type="primary" @click="clearJson">清空Json</el-button>
        <el-button type="primary" @click="downloadCompleteCode">下载完整项目代码</el-button>
        <el-button type="primary" @click="downloadCode">下载生成代码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { genAdapter, genProject } from '@/services/database.js'
import { getGenerateJson } from '@/services/otherSystem.js'
export default {
  data() {
    return {
      formRules: {
        type: [{ required: true, message: '请选择适配器类型', trigger: 'blur' }],
        name: [{ required: true, message: '请输入适配器名称', trigger: 'blur' }],
        componentName: [{ required: true, message: '请输入组件类型标识', trigger: 'blur' }],
        entrySuffixName: [{ required: true, message: '请输入入口文件后缀', trigger: 'blur' }],
        field: [{ required: true, message: '请输入字段Key', trigger: 'blur' }],
        elementName: [{ required: true, message: '请输入要素Key', trigger: 'blur' }],
        message: [{ required: true, message: '请输入要素信息', trigger: 'blur' }],
      },
      json: '',
      projectId:'1236ced77f414b87b3348cbaad3dc66b',
      formData: {
        type: '',
        name: '',
        componentName: '',
        entrySuffixName: '',
        element: [
          {
            id: nanoid(),
            field: '',
            elementName: '',
            message: '',
          },
        ],
      },
    }
  },
  methods: {
    async downloadCompleteCode() {
      let generateJson = ''
      if (this.projectId) {
        const {data} = await getGenerateJson(this.projectId)
        generateJson = data
      }else{
        generateJson = this.json
      }
      if (generateJson) {
        const file = await genProject(generateJson)
        const href = URL.createObjectURL(file)
        const box = document.createElement('a')
        box.href = href
        box.click()
      }
    },
    downloadCode() {},
    parseJson() {
      this.formData = {
        ...this.json,
        element: this.json?.element.map((item) => {
          return {
            id: nanoid(),
            ...item,
          }
        }),
      }
    },
    clearJson() {
      this.json = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code } = await genAdapter(this.formData)
          if (code == 0) {
            this.$message.success('操作成功')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$set(this.formData, 'element', [
        {
          id: nanoid(),
          field: '',
          elementName: '',
          message: '',
        },
      ])
      this.$refs[formName].resetFields()
    },
    removeElement(item) {
      var index = this.formData.element.findIndex((elementItem) => item == elementItem.id)
      if (index !== -1) {
        this.formData.element.splice(index, 1)
      }
    },
    addElement() {
      this.formData.element.push({
        id: nanoid(),
        field: '',
        elementName: '',
        message: '',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.layout-page {
  --layout-background-color: hsla(290, 0%, 93%, 1);
  --layout-background: radial-gradient(at 32% 3%, hsla(156, 50%, 31%, 0.15) 0px, transparent 50%),
    radial-gradient(at 99% 73%, hsla(156, 100%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 96%, hsla(154, 100%, 53%, 0.3) 0px, transparent 50%);
  --background-color-transparent: rgba(255, 255, 255, 0.6);
  --text-color: #000a1aad;
  --primary-color-opacity-1: rgba(39, 118, 88, 0.1);
}
.layout-page {
  height: 100%;
  background-color: var(--layout-background-color);
  background-image: var(--layout-background);
  padding: 10px;
}
</style>
