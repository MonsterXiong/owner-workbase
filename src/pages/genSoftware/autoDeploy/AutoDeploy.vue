<template>
  <el-form
    label-position="left"
    ref="formData"
    label-width="100px"
    :model="formData"
    class="demo-dynamic"
  >
    <el-form-item
      prop="projectName"
      label="项目名称"
      :rules="getRule('项目名称')"
    >
      <el-input v-model="formData.projectName"></el-input>
    </el-form-item>
    <el-form-item
      label="项目Code"
      prop="projectCode"
      :rules="getRule('项目Code')"
    >
      <el-input v-model="formData.projectCode" class="projectCode" style="width:300px"></el-input>
      <el-button @click="getPinYin" size="mini">自动生成</el-button>
    </el-form-item>
    <el-form-item label="端口号" prop="port" :rules="getRule('端口号')">
      <el-input v-model="formData.port"></el-input>
    </el-form-item>
    <el-form-item label="单位名称">
      <el-input v-model="formData.projectUnitName"></el-input>
    </el-form-item>
    <el-form-item label="单位Code">
      <el-input class="" v-model="formData.projectUnitCode"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="formData.description"></el-input>
    </el-form-item>
    <el-form-item label-width="0">
      <ProjectChild
        v-for="(child, index) in formData.children"
        :index="index"
        :child="child"
        :parentName="formData.projectName"
        :key="index"
        @onDelete="onDelete"
        @submit="getChild"
      ></ProjectChild>
    </el-form-item>
    <el-form-item label-width="0">
      <el-checkbox v-model="formData.isBuild">是否部署项目</el-checkbox>
      <el-checkbox v-model="formData.isPull">是否拉取项目</el-checkbox>
    </el-form-item>
    <el-button @click="addChild">添加子项</el-button>
    <el-button @click="submitForm('formData')">提交</el-button>
    <el-button @click="update">更新</el-button>
  </el-form>
</template>
<script>
// import autoDeploy from "../index";
import ProjectChild from "./ProjectChild.vue";
import { pinyin } from "pinyin-pro";
export default {
  components: {
    ProjectChild,
  },
  data() {
    return {
      index: 0,
      formData: {
        projectName: "默认项目",
        projectCode: "",
        projectUnitName: "",
        projectUnitCode: "",
        description: "",
        feGitUrl: "",
        beGitUrl: "",
        port: "",
        isBuild: true,
        isPull: true,
        children: [],
      },
    };
  },
  mounted() {
    this.addDefault();
    this.getPinYin();
  },
  methods: {
    update() {
      this.formData.children = [];
      this.getPinYin();
      this.addDefault();
    },
    addDefault() {
      this.formData.children = [
        {
          name: this.formData.projectName + "_前端",
          type: "fe",
          code: "",
          url: "",
          level: "fe-1",
        },
        {
          name: this.formData.projectName + "_后端",
          type: "be",
          code: "",
          url: "",
          level: "be-1",
        },
        {
          name: this.formData.projectName + "_后端基础模块",
          type: "be_boot",
          code: "",
          url: "",
          level: "be-2",
        },
      ];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            console.log('this.formData',this.formData);

        //   autoDeploy.post("/deploy", this.formData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addChild() {
      this.formData.children.push({
        name: `${this.formData.projectName}_前端`,
        type: "fe",
        url: "",
        code: "",
        level: "fe-1",
      });
      console.log(this.formData.children);
      this.index++;
    },
    onDelete(index) {
      this.formData.children.splice(index, 1);
    },
    getRule(label) {
      return {
        required: true,
        message: `${label}不能为空`,
        trigger: "blur",
      };
    },
    getChild(data) {
      this.formData.children[data[0]] = { ...data[1] };
    },
    getPinYin() {
      this.formData.projectCode = pinyin(
        this.formData.projectName.split("_")[0],
        {
          toneType: "none",
          pattern: "first",
        }
      ).replaceAll(" ", "");
    },
  },
};
</script>
<style scoped lang="less">
.demo-dynamic {
  background-color: white;
  width: 500px;
  padding: 10px;
  height: calc(100% - 122px);
  overflow-y: auto;
}
/deep/ .el-form-item__content {
  display: flex;
  flex-wrap: wrap;
}
.projectCode {
  width: calc(100% - 70px);
}
</style>
