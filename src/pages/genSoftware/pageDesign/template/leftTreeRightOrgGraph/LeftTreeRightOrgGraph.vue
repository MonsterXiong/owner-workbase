<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="树（列表）" title="组织图">
      <template #left>
        树（列表）
      </template>
        组织图
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
