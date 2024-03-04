<template>
  <div style="display: flex; gap: 10px; height: 100%" class="layout-page">
    <div style="flex: 1">
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="auto" class="demo-dynamic">
        <el-form-item prop="type" label="适配器类型">
          <el-select v-model="formData.type" placeholder="请选择适配器类型">
            <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
          <el-button type="primary" @click="submitForm('formRef')" style="margin-right: 5px">生成</el-button>
          <el-button type="primary" @click="parseForm('formRef')" style="margin-right: 5px">解析</el-button>
          <el-button @click="resetForm('formRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
      <div style="flex: 1; overflow: hidden">
        <div class="projectId-input">
          <el-form inline>
            <el-form-item prop="type" label="项目">
              <el-select v-model="projectId" placeholder="请选择项目" clearable>
                <el-option v-for="item in projectList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button @click="getGenerateJson">查询</el-button>
        </div>

        <div class="code-json-editor">
          <vueJsonEditor
            style="height: 100%"
            v-model="jsonContent"
            :show-btns="true"
            copyable
            downloadable
            mode="code"
            lang="zh"
            :expanded-on-start="true"
            @json-change="onJsonChange"
            @json-save="onJsonSave"
            @has-error="onError"
          ></vueJsonEditor>
        </div>
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
import { GenToolExtendService, GenExtendService } from '@/services'
import { getGenerateJson, getProjectList } from '@/services/otherSystem.js'
import vueJsonEditor from 'vue-json-editor'
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
      hasJsonFlag: true,
      jsonContent: {},
      projectId: '1236ced77f414b87b3348cbaad3dc66b',
      typeOption: [
        {
          label: '页面',
          value: 'page',
        },
        {
          label: '其他',
          value: 'other',
        },
      ],
      formData: {
        type: 'page',
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
      projectList: [],
    }
  },
  components: {
    vueJsonEditor,
  },
  mounted() {
    this.getProjectList()
  },
  methods: {
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
    onJsonChange(value) {
      this.onJsonSave(value)
    },
    onJsonSave(value) {
      this.jsonContent = value
      this.hasJsonFlag = true
    },
    onError(value) {
      console.log('json错误了value:', value)
      this.hasJsonFlag = false
    },
    async getGenerateJson() {
      if (!this.projectId) {
        this.$message.warning('请先选择项目')
      }
      const { data } = await getGenerateJson(this.projectId)
      this.jsonContent = data
    },
    async downloadCompleteCode() {
      let generateJson = this.jsonContent
      // if (this.projectId) {
      //   const { data } = await getGenerateJson(this.projectId)
      //   generateJson = data
      // } else {
      //   generateJson = this.jsonContent
      // }
      if (generateJson) {
        const file = await GenExtendService.genProject(generateJson)
        const href = URL.createObjectURL(file)
        const box = document.createElement('a')
        box.href = href
        box.click()
      }
    },
    downloadCode() {},
    parseJson() {
      Object.keys(this.jsonContent).forEach((key) => {
        if (Object.keys(this.formData).includes(key)) {
          if (key == 'element') {
            this.formData[key] = this.jsonContent[key].map((item) => {
              return {
                id: nanoid(),
                ...item,
              }
            })
          } else {
            this.formData[key] = this.jsonContent[key]
          }
        }
      })
      // this.formData = {
      //   ...this.jsonContent,
      //   element: this.jsonContent?.element.map((item) => {
      //     return {
      //       id: nanoid(),
      //       ...item,
      //     }
      //   }),
      // }
    },
    clearJson() {
      this.jsonContent = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code } = await GenToolExtendService.genAdapter(this.formData)
          if (code == 0) {
            this.$message.success('操作成功')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    parseForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let param = _.cloneDeep(this.formData)
          if (this.formData?.element?.length) {
            param.element = param.element.filter((item) => item.name)
            if (!param.element.length) {
              param.element = [
                {
                  id: nanoid(),
                  field: '',
                  elementName: '',
                  message: '',
                },
              ]
            }
          }
          this.jsonContent = param
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

.projectId-input {
  height: 50px;
  display: flex;
  align-items: center;
  /deep/ .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
}
.code-json-editor {
  height: calc(100% - 50px);
  /deep/ .jsoneditor-poweredBy {
    display: none !important;
  }
  /deep/ .jsoneditor-vue {
    height: 100%;
  }
}
</style>
