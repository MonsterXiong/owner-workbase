<template>
  <div class="header-container">
    <img class="bg-img" src="static/images/head.jpg" />
    <div class="left">
      <img src="static/images/logo.png" alt="" />
      <span class="title"> {{ configData.systemName }} </span>
    </div>
    <div class="center" style="display: flex; flex-direction: column">
      <div class="top-wrapper">
        <span :class="{ active: currentActiveMenu == item.menuCode }" v-for="item in menuList" :key="item.menuCode" @click="onMenuItemClick(item)">
          <span :class="`iconfont ${item.icon}`" />{{ item.name }}</span
        >
      </div>
      <div class="bottom-wrapper">
        <span :class="{ active: currentActiveSubMenu.startsWith(item.eventParams)}" v-for="(item, index) in currentSubMenuList" :key="index" @click="onClick(item)">
          <span :class="`iconfont ${item.icon}`" />
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="right">
      <Setting style="margin: 0 5px" />
      <!-- <Logout></Logout> -->
    </div>
  </div>
</template>

<script>
// import Logout from './Logout'
import Setting from './Setting.vue'
import configData from '@/utils/config'
import { menuData, MENU_CODE } from '../index'
import { EMIT_TYPE,VIEW_TYPE} from '@/common/constant'
export default {
  data() {
    return {
      configData,
      menuData,
      currentActiveMenu: MENU_CODE.GEN_SOFTWARE,
      currentActiveSubMenu: '',
    }
  },
  computed: {
    menuList() {
      return this.menuData.filter((item) => item.type == VIEW_TYPE.VIEW_MODULE)
    },
    currentSubMenuList() {
      return this.menuData.filter((item) => item.type == VIEW_TYPE.VIEW_PAGE && item.parent == this.currentActiveMenu)
    },
  },
  watch: {
    $route: {
      handler(newValue) {
        this.currentActiveSubMenu = newValue.fullPath
      },
      immediate: true,
    },
  },
  methods: {
    onMenuItemClick(row) {
      if(row.disabled){
        return this.$message.info('正在开发中')
      }
      this.currentActiveMenu = row.menuCode
    },
    onClick(menuItem) {
      const {eventType,eventParams} = menuItem
      if(!eventParams){
        return
      }
      if (eventType != EMIT_TYPE.PAGE) {
        return this.$emitter.emit(eventParams)
      }
      if (this.$route.fullPath != eventParams) {
        return this.$router.push(eventParams)
      }
    },
  },
  components: {
    // Logout,
    Setting,
  },
}
</script>

<style lang="less" scoped>
@fontSizeLarge: 32px;
@fontSizeMiddle: 26px;
@fontSizeSmall: 20px;
.header-container {
  position: relative;
  box-shadow: 0px 0px 6px 0px rgba(53, 105, 203, 0.4);
  height: 100%;
  display: flex;
  .bg-img {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .left {
    width: 23.5%;
    font-size: @fontSizeLarge;
    font-weight: bold;
    margin-left: 20px;
    display: flex;
    align-items: center;
    height: 80px;
    .title {
      font-family: 'ALIMAMASHUHEITI-BOLD';
      //   color: #255781;
      color: transparent;
      font-weight: bold;
      font-size: 32px;
      background-image: @bg-color-linear--primary;
      background-clip: text;
    }
    img {
      margin-right: 10px;
      height: 50px;
      //   width: 50px;
    }
  }
  .center {
    color: @font-color--primary;
    flex: 1;
    letter-spacing: 1px;
    .top-wrapper {
      margin-bottom: 4px;
      height: 44px;
      font-size: 20px;
      display: flex;
      align-items: center;
      font-weight: bold;
      > span {
        display: flex;
        align-items: center;
        margin-right: 105px;
        padding: 4px 8px;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          background: @menu-hover-color;
        }
        > span {
          font-size: 20px;
          margin-right: 5px;
        }
      }
      .active {
        background: @bg-color-linear--primary;
        color: @white-color;
        &:hover {
          background: @bg-color-linear--primary;
        }
        > span {
          color: @white-color;
        }
      }
      .nav-icon {
        vertical-align: middle;
        height: 28px;
        width: 30px;
      }
    }
    .bottom-wrapper {
      height: 32px;
      font-size: 14px;
      display: flex;
      align-items: center;
      > span {
        display: flex;
        align-items: center;
        margin-right: 40px;
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 6px;
        &:hover {
          background: @bg-color-hover--primary;
        }
        > span {
          margin-right: 4px;
        }
      }
      .active {
        background: @bg-color-linear--primary;
        color: @white-color;
        &:hover {
          background: @bg-color-linear--primary;
        }
        > span {
          color: @white-color;
        }
      }
    }
  }
  .right {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
}
</style>
