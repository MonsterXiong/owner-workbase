<template>
  <div class="common-page">
    <!-- 页面配置 -->
    <!-- 不管如何表格是有的 -->
    <!-- 是否要分页 -->
    <!-- 是否有搜索 -->
    <!-- 是否有弹窗 -->
    <!-- 是否有编辑 -->
    <!-- 是否有新增 -->
    <SplitLayout :projectId="projectId" title="通用表格配置">
      <div class="general-table">
        <div style="display:flex;gap:10px">
          <SelectDbTable :projectId="projectId" @onChange="onCurrentTableName" ref="selectDbTableRef"></SelectDbTable>
          <el-form :inline="true" class="demo-form-inline" style="display: flex;align-items: center;height:100%">
            <el-form-item label="功能">
              <el-checkbox-group v-model="configFormData">
                <el-checkbox label="isQuery">搜索</el-checkbox>
                <el-checkbox label="isForm">编辑/新增</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <SetDbFieldTable :columnConfig="columnConfig" :projectId="projectId" :tableName="tableName"
          :sourceList="sourceList" :isRemote="isRemote" ref="setDbFieldTableRef"></SetDbFieldTable>
      </div>
    </SplitLayout>
  </div>
</template>
<script>
import SelectDbTable from "@/bizComponents/selectDbTable/SelectDbTable.vue";
import SetDbFieldTable from "@/bizComponents/setDbFieldTable/SetDbFieldTable.vue";
import SplitLayout from '@/components/splitLayout/SplitLayout.vue';
export default {
  props: {
    projectId: {},
    menuDetailInfo: {}
  },
  components: {
    SelectDbTable,
    SetDbFieldTable,
    SplitLayout
  },
  data() {
    return {
      tableName: null,
      isRemote: false,
      sourceList: [],
      columnConfig: {
        isQuery:false,
        isForm:false,
        // isPrimaryKey:false
      },
      configFormData: []
    }
  },
  watch: {
    menuDetailInfo: {
      handler(newValue, oldValue) {
        const menuParam = JSON.parse(newValue.menuParam)
        const { templateParam } = menuParam
        if (templateParam?.tableCode) {
          this.isRemote = false
          const { tableCode, attrs } = templateParam
          this.$nextTick(() => {
            this.$refs.selectDbTableRef.setCurrentValue(tableCode)
            this.sourceList = attrs
          })
        } else {
          this.isRemote = true
        }
      },
      immediate: true
    },
    configFormData: {
      handler(newValue) {
        this.changeFunctionConfig(newValue)
      },
      immediate: true
    }
  },
  methods: {
    changeFunctionConfig(value) {
      Object.keys(this.columnConfig).forEach(key=>{
        this.$set(this.columnConfig, key, this.configFormData.includes(key))
      })
      this.$set(this.columnConfig, 'isPrimary', value.includes('isForm'))
    },
    onCurrentTableName(tableName) {
      this.isRemote = true
      this.sourceList = []
      this.tableName = tableName
    },
    getInfo() {
      const tableInfo = this.$refs.selectDbTableRef.getCurrentNode(this.tableName)
      const fieldInfo = this.$refs.setDbFieldTableRef.getTableData()
      const templateParam = {
        tableCode: tableInfo.name,
        tableName: tableInfo.comment || '',
        pageConfig:{
          ...this.columnConfig
        },
        attrs: [...fieldInfo]
      }
      return templateParam
    }
  },

}
</script>

<style lang="less" scoped>
.general-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px
}
</style>
