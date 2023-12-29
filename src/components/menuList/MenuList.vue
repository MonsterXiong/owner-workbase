<template>
  <div class="menu-list-comp">
    <template v-if="showHeader">
      <header>
        <template v-if="$slots.header">
          <slot name="header"></slot>
        </template>
        <template v-else>
          <slot name="header-title">
            <span class="header-title">{{ headerTitle }}</span>
          </slot>
          <slot name="ext"></slot>
        </template>
      </header>
    </template>
    <section :style="{ height: showHeader ? 'calc(100% - 40px)' : '100%' }">
      <ul>
        <li v-for="(menu, index) in menuList" :title="menu.name" :key="index"
          :class="{ active: menu[menuKey] === currentActiveMenu }" @click="onClick(menu)">{{ menu.name }}</li>
      </ul>
    </section>

  </div>
</template>

<script>
export default {
  name: 'MenuList',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String
    },
    menuList: {
      type: Array,
      default: () => []
    },
    menuKey: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    showHeader() {
      return this.showTitle && this.headerTitle
    }
  },
  watch: {
    menuList: {
      handler(newValue) {
        if (newValue?.length && !this.currentActiveMenu) {
          this.onClick(newValue[0])
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      currentActiveMenu: ''
    }
  },
  methods: {

    onClick(menu) {
      this.currentActiveMenu = menu[this.menuKey]
      this.$emit('onClick', menu[this.menuKey], menu)
    },
  },
}
</script>

<style lang="less" scoped>
.menu-list-comp {
  height: 100%;
  width: 100%;
  overflow: hidden;

  header {
    height: 40px;
    padding: 0 10px;
    border-bottom: 1px @border-type @border-color--primary;
    display: flex;
    align-items: center;

    .header-title {
      flex: 1;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      color:@font-color--primary
    }
  }

  section {
    overflow-y: auto;

    >ul {
      height: 100%;
      overflow-y: auto;

      li {
        padding: 10px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: bolder;
        &:hover,
        &.active {
          cursor: pointer;
          color:@font-color--primary;
        }
      }
    }
  }


}
</style>
