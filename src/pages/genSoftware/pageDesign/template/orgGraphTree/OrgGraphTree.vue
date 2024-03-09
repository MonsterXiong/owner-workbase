<template>
  <div class="common-page org-graph-tree">
    <div>org_graph_tree-组织图-有</div>
    <div>存在多个表进行数据清洗 => 属性选择，展示名称，唯一标识，父id</div>
    <SelectDbTable :projectId="projectId" @onChange="onChangeTableName"></SelectDbTable>
    <div style="display: flex;gap:10px">
      <SelectDbField title="唯一标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <SelectDbField title="父级标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <SelectDbField title="展示名称" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <el-button>添加子表</el-button>
    </div>
    <div>例如bindAbility,则将顶级节点根据所属字段进行清洗数据</div>
    <SelectDbTable :projectId="projectId" @onChange="onChangeTableName"></SelectDbTable>
    <div style="display: flex;gap:10px">
      <SelectDbField title="唯一标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <SelectDbField title="所属字段" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <SelectDbField title="父级标识" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <SelectDbField title="展示名称" :projectId="projectId" :tableName="tableName" @onChange="onChangeField"></SelectDbField>
      <el-button>添加子表</el-button>
    </div>

  </div>
</template>

<script>
import SelectDbTable from "@/bizComponents/selectDbTable/SelectDbTable.vue";
import SelectDbField from "@/bizComponents/selectDbField/SelectDbField.vue";

export default {
  props: {
    projectId: {},
  },
  components: {
    SelectDbTable,
    SelectDbField
  },
  data() {
    return {
      tableName: null,
      fieldName:null,
    }
  },
  methods: {
    onChangeTableName(tableName) {
      this.fieldName = null
      this.tableName = tableName
    },
    onChangeField(fieldName) {
      this.fieldName = fieldName
    }
  },

}
</script>

<style lang="less" scoped>
.org-graph-tree {
  display: flex;
  flex-direction: column;
  gap:10px
}
</style>
