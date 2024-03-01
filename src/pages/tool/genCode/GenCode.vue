<template>
  <div class="common-page">
    <HeaderMenu style="height:40px;" :currentActive.sync="currentActive"></HeaderMenu>
    <div class="main-container">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import HeaderMenu from './headerMenu/HeaderMenu'
import { HEADER_TYPE, PAGE_MAP } from './pageMap'
export default {
  created() {
    this.currentActive = this.$route.query?.menuType || HEADER_TYPE.PROJECT

  },
  data() {
    return {
      currentActive: '',
    }
  },
  computed: {
    currentComponent() {
      return PAGE_MAP[this.currentActive] || null
    }
  },
  watch: {
    currentActive(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          const fullpath = `${this.$route.path}?menuType=${this.currentActive}`
          if(fullpath !== this.$route.fullPath){
            this.$router.push(fullpath)
          }
        }
      },
  },
  components: {
    HeaderMenu,
  },
}
</script>

<style lang="less" scoped>
.main-container {
  height: calc(100% - 40px);
  border-radius: 4px;
  padding: 10px;
}
</style>
