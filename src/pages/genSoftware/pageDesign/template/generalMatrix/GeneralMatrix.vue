<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="横向" title="纵向" rightTitle="关联">
      <template #left>
        横向
      </template>
      纵向
      <template #right>
        关联
      </template>
    </SplitLayout>
  </div>
</template>
<script>
import SplitLayout from '@/bizComponents/splitLayout/SplitLayout.vue';
export default {
  props: {
    projectId: {},
    menuDetailInfo: {}
  },
  components: {
    SplitLayout
  },
}
</script>
<style lang="less" scoped>
</style>
