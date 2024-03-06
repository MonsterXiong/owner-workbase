<template>
  <div class="general-table">
    <div>general_table-通用表格-有</div>
    <SelectDbTable :projectId="projectId" @onChange="onChangeTableName"></SelectDbTable>
  </div>
</template>
<script>
import SelectDbTable from "@/bizComponents/selectDbTable/SelectDbTable.vue";
export default {
  props: {
    projectId: {},
  },
  components: {
    SelectDbTable,
  },
  data() {
    return {
      tableName: null,
    }
  },
  methods: {
    onChangeTableName(tableName) {
      this.tableName = tableName
    },
  },

}
</script>

<style lang="less" scoped>
.general-table {
  display: flex;
  flex-direction: column;
  gap:10px
}
</style>
