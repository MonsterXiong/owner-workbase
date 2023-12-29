<template>
  <div class="logout" @click="logout" title="退出">
    <span title="退出">
      <img class="nav-icon" src="static/icon/quit.svg" />
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirectUrl=${this.$router.currentRoute.fullPath}`)
    },
  },
}
</script>

<style lang="less" scoped>
.logout {
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
