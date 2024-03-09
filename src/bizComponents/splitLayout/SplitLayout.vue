<template>
  <div class="common-page split-layout" :style="{ flexDirection: splitType == 'horizontal' ? 'column' : 'row' }">
    <template v-if="$slots.left">
      <div class="wrapper">
        <div class="header">{{ leftTitle || '左侧' }}</div>
        <div class="main-content">
          <div class="select-db-wrapper">
            <SelectDbTable :sourceList="tableList" @onChange="onCurrentLeftTableName" ref="selectDbTableListRef" />
          </div>
          <div class="slot-content">
            <slot name="left"></slot>
          </div>
        </div>
      </div>
    </template>
    <div class="wrapper">
      <div class="header">{{ title || '中间' }}</div>
      <div class="main-content">
        <div class="select-db-wrapper">
          <SelectDbTable :sourceList="tableList" @onChange="onCurrentTableName" ref="selectDbTableListRef" />
        </div>
        <div class="slot-content">
          <slot></slot>
        </div>
      </div>
    </div>
    <template v-if="$slots.right">
      <div class="wrapper">
        <div class="header">{{ rightTitle || '右侧' }}</div>
        <div class="main-content">
          <div class="select-db-wrapper">
            <SelectDbTable :sourceList="tableList" @onChange="onCurrentRightTableName" ref="selectDbTableListRef" />
          </div>
          <div class="slot-content">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SelectDbTable from '@/bizComponents/selectDbTable/SelectDbTable.vue';
import { SfProjectExtendService } from "@/services";

export default {
  props: {
    projectId: {},
    splitType: {
      type: String,
      default: 'vertical'
    },
    title: {},
    leftTitle: {},
    rightTitle: {}
  },
  data() {
    return {
      tableList: []
    }
  },
  components: {
    SelectDbTable,
  },
  mounted() {
    this.getTableList(this.projectId)
  },
  methods: {
    async getTableList(projectId) {
      const { data } = await SfProjectExtendService.getTableByProjectId(projectId)
      this.tableList = data
    },

    onCurrentLeftTableName() { },
    onCurrentTableName() { },
    onCurrentRightTableName() { },
  },
}
</script>

<style lang="less" scoped>
.split-layout {
  display: flex;
  gap: 10px;

  .wrapper {
    flex: 1;
    height: 100%;
    border: 1px dashed #999;

    .header {
      line-height: 30px;
      text-align: center;
      font-weight: bold;
    }

    .main-content {
      height: calc(100% - 30px);
      padding: 0 5px
    }
    .select-db-wrapper{
      height: 44px;
      margin-bottom: 5px;
    }
    .slot-content{
      height: calc(100% - 49px);
    }
  }
}
</style>
