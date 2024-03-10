<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" title="合并表格配置">
      <div class="merge-table">
        <SelectDbTable :projectId="projectId" @onChange="onCurrentTableName" ref="selectDbTableRef"></SelectDbTable>
        <SelectFieldTableForMergeTable :projectId="projectId" :tableName="tableName" :sourceList="sourceList" :isRemote="isRemote" ref="setDbFieldTableRef"></SelectFieldTableForMergeTable>
      </div>
    </SplitLayout>
  </div>
</template>
<script>
import SelectDbTable from "@/bizComponents/selectDbTable/SelectDbTable.vue";
import SelectFieldTableForMergeTable from "./components/SelectFieldTableForMergeTable.vue";
import SplitLayout from '@/components/splitLayout/SplitLayout.vue';

export default {
  props: {
    projectId: {},
    menuDetailInfo:{}
  },
  components: {
    SelectDbTable,
    SelectFieldTableForMergeTable,
    SplitLayout,
  },
  data() {
    return {
      tableName: null,
      isRemote:false,
      sourceList:[]
    }
  },
  watch: {
    menuDetailInfo:{
      handler(newValue, oldValue) {
        const menuParam = JSON.parse(newValue.menuParam)
        const {templateParam} = menuParam
        if(templateParam?.tableCode){
          this.isRemote = false
          const { tableCode ,attrs} = templateParam
          this.$nextTick(()=>{
            this.$refs.selectDbTableRef.setCurrentValue(tableCode)
            this.sourceList = attrs
          })
        }else{
          this.isRemote = true
        }
      },
      immediate:true
    }
  },
  methods: {
    onCurrentTableName(tableName) {
      this.isRemote = true
      this.sourceList = []
      this.tableName = tableName
    },
    getInfo(){
      const tableInfo = this.$refs.selectDbTableRef.getCurrentNode(this.tableName)
      const fieldInfo = this.$refs.setDbFieldTableRef.getTableData()
      const templateParam = {
          tableCode: tableInfo.name,
          tableName: tableInfo.comment || '',
          attrs: [...fieldInfo]
      }
      return templateParam
    }
  },

}
</script>

<style lang="less" scoped>
.merge-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px
}
</style>
