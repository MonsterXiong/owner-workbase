<template>
  <div class="common-page general-table">
    <!-- <div>general_table-通用表格-有-开始对数据和物理模型了-字段</div> -->
    <SelectDbTable :projectId="projectId" @onChange="onCurrentTableName" ref="selectDbTableRef"></SelectDbTable>
    <SetDbFieldTable :projectId="projectId" :tableName="tableName" :sourceList="sourceList" :isRemote="isRemote" ref="setDbFieldTableRef"></SetDbFieldTable>
  </div>
</template>
<script>
import SelectDbTable from "@/bizComponents/selectDbTable/SelectDbTable.vue";
import SetDbFieldTable from "@/bizComponents/setDbFieldTable/SetDbFieldTable.vue";
export default {
  props: {
    projectId: {},
    menuDetailInfo:{}
  },
  components: {
    SelectDbTable,
    SetDbFieldTable
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
.general-table {
  display: flex;
  flex-direction: column;
  gap: 10px
}
</style>
