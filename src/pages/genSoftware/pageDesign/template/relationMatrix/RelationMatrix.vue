<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="横向" title="纵向" rightTitle="关联">
      <template #left>
        <div style="display: flex;flex-direction: column;gap:10px">
          <SelectDbField title="唯一标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
          <SelectDbField title="父级标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
          <SelectDbField title="展示名称" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
        </div>
      </template>
      <div style="display: flex;flex-direction: column;gap:10px">
          <SelectDbField title="唯一标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
          <SelectDbField title="父级标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
          <SelectDbField title="展示名称" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
        </div>
      <template #right>
        <div style="display: flex;flex-direction: column;gap:10px">
          <SelectDbField title="唯一标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
          <SelectDbField title="关系字段" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
        </div>
      </template>
    </SplitLayout>
  </div>
</template>
<script>
import SplitLayout from '@/bizComponents/splitLayout/SplitLayout.vue';
import SelectDbField from '@/bizComponents/selectDbField/SelectDbField.vue';
export default {
  props: {
    projectId: {},
    menuDetailInfo: {}
  },
  components: {
    SplitLayout,
    SelectDbField
  },
  methods: {
    onChangeField() {

    }
  },
}
</script>
<style lang="less" scoped>
</style>
