<template>
  <div class="common-page">
    <template v-if="isModule">
      <div>这是模块</div>
    </template>
    <template v-else-if="currentComponent">
      <component :is="currentComponent"></component>
    </template>
  </div>
</template>

<script>
import { COMPONENT_MAP } from '../template/index'
export default {
  props: {
    currentActivePage: {},
  },
  computed: {
    isModule() {
      return this.currentActivePage?.menuType == 'module'
    },
    currentComponent() {
      return COMPONENT_MAP[this.currentActivePage?.param?.type]
    },
  },
}
</script>

<style lang="less" scoped></style>
