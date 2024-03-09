<template>
  <div class="common-page">
    <SplitLayout leftTitle="列表" title="普通绘图" rightTitle="表单">
      <template #left>
        列表
      </template>
        普通绘图
      <template #right>
        表单
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
