<template>
  <div class="common-page">
    <SplitLayout :panelSize="3" :projectId="projectId" leftTitle="列表" title="表格">
      <template #left>
        <SelectSingleDb :formData.sync="leftFormData"
          ref="selectSingDbLeftRef" :dataList="tableList" type="list" :projectId="projectId"></SelectSingleDb>
      </template>
      <div class="right-wrapper">
        <SelectSingleDb
          trigger
          inLine
          :fieldList="fieldData"
          :formData.sync="rightFormData"
          ref="selectSingDbRightRef"
          :dataList="tableList"
          type="default"
          :projectId="projectId"
          @onChangeTable="onChangeTable">
        </SelectSingleDb>
        <SetDbFieldTable :projectId="projectId" :tableName="tableName"   ref="setDbFieldRef"></SetDbFieldTable>
      </div>
    </SplitLayout>
  </div>
</template>
<script>
import { SfProjectExtendService } from "@/services";
import SplitLayout from '@/components/splitLayout/SplitLayout.vue';
import SelectSingleDb from '@/bizComponents/selectSingleDb/SelectSingleDb.vue';
import SetDbFieldTable from "@/bizComponents/setDbFieldTable/SetDbFieldTable.vue";
export default {
  props: {
    projectId: {},
    menuDetailInfo: {}
  },
  components: {
    SplitLayout,
    SelectSingleDb,
    SetDbFieldTable,
  },
  data() {
    return {
      tableList: [],
      tableName: null,
      leftFormData: {
        tableName: '',
        fieldList: {}
      },
      rightFormData: {
        tableName: '',
        fieldList: {}
      },
      fieldData:[{
        key:'assiationId',
        prop:'',
        label:'联动Id'
      }]
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      const { data } = await SfProjectExtendService.getTableByProjectId(this.projectId)
      this.tableList = data
    },
    onChangeTable(tableName){
      this.tableName = tableName
    },
    getInfo(){
      const list = this.$refs.selectSingDbRightRef.getData()
      const table = this.$refs.selectSingDbLeftRef.getData()
      const fieldInfo = this.$refs.setDbFieldRef.getTableData()
      if(!list || !table){
        return null
      }
      const templateParam = {
        list,
        table
      }
      return null
    },
  },
}
</script>
<style lang="less" scoped>
.right-wrapper{
  height:100%;
  display: flex;
  flex-direction: column;
  gap: 10px
}
</style>
