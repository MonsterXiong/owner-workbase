<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="列表" title="表格">
      <template #left>
        列表
      </template>
      表格
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
