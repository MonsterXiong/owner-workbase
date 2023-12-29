<template>
  <div class="setting" title="设置">
    <el-popover placement="bottom" width="90" trigger="click">
      <div style="display: flex; flex-direction: column; gap: 10px">
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <el-button size="mini" @click="goToSetting">评分准则配置</el-button>
        <!-- <el-button size="mini">推演数据配置</el-button> -->
        <!-- <el-button style="margin: 0" size="mini" @click="onEditColor">颜色配置</el-button> -->
      </div>
      <img slot="reference" class="nav-icon" src="static/icon/set.svg" />
    </el-popover>
  </div>
</template>

<script>
import { routesConstant } from '@/router'

export default {
  methods: {
    goToSetting() {
      // this.$router.push(routesConstant?.STANDARD_SETTING.path)
    },
  },
}
</script>

<style lang="less" scoped>
.setting {
  &:hover {
    cursor: pointer;
  }
  .nav-icon {
    vertical-align: middle;
    height: 30px;
    width: 30px;
  }
}
</style>
<style>
.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
