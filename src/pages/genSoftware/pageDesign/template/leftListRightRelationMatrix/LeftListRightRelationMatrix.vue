<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="列表" title="关系矩阵">
      <template #left>
        列表
      </template>
      关系矩阵
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
