<template>
  <div class="child">
    <div class="head">
      <i
        v-if="!expand"
        class="el-icon-arrow-right"
        font-size="15px"
        @click="doExpand"
      ></i>
      <i
        v-else
        font-size="15px"
        class="el-icon-arrow-down"
        @click="doExpand"
      ></i>
      <div class="child-title">
        {{ childData.name }}
      </div>
      <i class="el-icon-circle-close delete" @click="onDelete"></i>
    </div>
    <div class="content" v-if="expand">
      <el-form
        label-position="left"
        ref="child"
        label-width="100px"
        :model="childData"
        class="demo-dynamic"
      >
        <el-form-item label="名称" prop="name" :rules="getRule('名称')">
          <el-input size="mini" v-model="childData.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" :rules="getRule('类型')">
          <el-select
            v-model="childData.type"
            size="mini"
            placeholder="请选择"
            width="300px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="git地址">
          <el-input size="mini" v-model="childData.url"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select
            v-model="childData.level"
            size="mini"
            placeholder="请选择"
            width="300px"
          >
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input
            size="mini"
            v-model="childData.code"
            class="projectCode"
          ></el-input>
          <el-button size="mini" @click="getPinYin" class="pinyin"
            >拼音</el-button
          >
        </el-form-item>
        <!-- <el-button size="mini" @click="enSure('child')">确定</el-button> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { pinyin } from "pinyin-pro";
export default {
  props: ["index", "child", "parentName"],
  data() {
    return {
      expand: false,
      childData: {
        name: "",
        type: "fe",
        url: "",
        code: "",
        level: "fe-1",
      },
      options: [
        {
          label: "前端",
          value: "fe",
        },
        {
          label: "后端",
          value: "be",
        },
        {
          label: "后端_基础模块",
          value: "be_boot",
        },
      ],
      levels: [
        {
          label: "前端一级",
          value: "fe-1",
        },
        {
          label: "前端二级",
          value: "fe-2",
        },
        {
          label: "后端一级",
          value: "be-1",
        },
        {
          label: "后端二级",
          value: "be-2",
        },
      ],
    };
  },
  watch: {
    child: {
      deep: true,
      immediate: true,
      handler(val) {
        if (Object.keys(val).length != 0) {
          this.childData = val;
        }
      },
    },
    childData: {
      deep: true,
      immediate: false,
      handler() {
        this.enSure("child");
      },
    },
  },
  methods: {
    doExpand() {
      this.expand = !this.expand;
    },
    onDelete() {
      this.$emit("onDelete", this.index);
    },
    enSure(formName) {
      try {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("submit", [this.index, this.childData]);
          } else {
            // return false;
          }
        });
      } catch {
        //
      }
    },
    getRule(label) {
      return {
        required: true,
        message: `${label}不能为空`,
        trigger: "blur",
      };
    },
    getPinYin() {
      this.childData.code = pinyin(this.childData.name.split("_")[0], {
        toneType: "none",
        pattern: "first",
      }).replaceAll(" ", "");
    },
  },
};
</script>
<style scoped lang="less">
.child {
  width: calc(100% - 60px);
  margin: 0 30px;
}
.head {
  width: 100%;
  display: inline-flex;
  position: relative;
  align-items: center;
}
.content {
  width: 100%;
}
.delete {
  position: absolute;
  font-size: 15px;
  right: 0;
}
.child-title {
  padding: 0;
}
/* /deep/ .el-select {

} */
/deep/ .el-form-item__content {
  align-items: center;
  text-align: left;
}
.projectCode {
  width: calc(100% - 60px);
}
.pinyin {
  height: 28px;
}
</style>
