<template>
  <div>
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: { Header },
}
</script>

<style lang="less" scoped>
.header-wrapper {
  height: @header-height;
}

.main-container {
  padding: 10px;
  background: #e5eefd;
  height: calc(100vh - @header-height);
  position: relative;
  overflow: hidden;
}
.current-project {
  color: #356491;
  font-weight: 600;
  margin-right: 10px;
}
</style>
