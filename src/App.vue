<template>
  <div id="app">
    <router-view />
    <ModalAll />
  </div>
</template>

<script>
import ModalAll from './modalAll/index.vue'
export default {
  data() {
    return {}
  },
  components: { ModalAll },
}
</script>

<style lang="less">
</style>
