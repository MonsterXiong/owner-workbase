<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="组织图" title="表单">
      <template #left>
        组织图
      </template>
      表单
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
