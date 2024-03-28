<template>
  <div class="common-page">
    <SplitLayout :projectId="projectId" leftTitle="横向" title="纵向" rightTitle="关联">
      <template #left>
        <SelectSingleDb :emptyRuleField="['parentCode']" :formData.sync="horizontalFormData"
          ref="selectSingDbHorizontalRef" :dataList="tableList" type="tree" :projectId="projectId"></SelectSingleDb>
      </template>
      <SelectSingleDb :emptyRuleField="['parentCode']" :formData.sync="verticalFormData" ref="selectSingDbVerticalRef"
        :dataList="tableList" type="tree" :projectId="projectId"></SelectSingleDb>
      <template #right>
        <SelectSingleDb :emptyRuleField="['relCode']" :formData.sync="relFormData" ref="selectSingDbRelRef"
          :dataList="tableList" type="matrix" :projectId="projectId"></SelectSingleDb>
      </template>
    </SplitLayout>
  </div>
</template>
<script>
import { SfProjectExtendService } from "@/services";
import SplitLayout from '@/components/splitLayout/SplitLayout.vue';
import SelectSingleDb from '@/bizComponents/selectSingleDb/SelectSingleDb.vue';
export default {
  props: {
    projectId: {},
    menuDetailInfo: {}
  },
  components: {
    SplitLayout,
    SelectSingleDb
  },
  watch: {
    menuDetailInfo: {
      handler(newValue, oldValue) {
        const menuParam = JSON.parse(newValue.menuParam)
        const { templateParam } = menuParam
        if (templateParam) {
          const { horizontal, rel, vertical } = templateParam
          if (horizontal) {
            this.horizontalFormData = horizontal
          }
          if (vertical) {
            this.verticalFormData = vertical
          }
          if (rel) {
            this.relFormData = rel
          }
        }

      },
      immediate: true
    }
  },
  data() {
    return {
      tableList: [],
      horizontalFormData: {
        tableName: '',
        fieldList: {}
      },
      verticalFormData: {
        tableName: '',
        fieldList: {}
      },
      relFormData: {
        tableName: '',
        fieldList: {}
      },
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
    getInfo() {
      const horizontal = this.$refs.selectSingDbHorizontalRef.getData()
      const vertical = this.$refs.selectSingDbVerticalRef.getData()
      const rel = this.$refs.selectSingDbRelRef.getData()
      if(!horizontal || !vertical || !rel){
        return null
      }
      const templateParam = {
        horizontal,
        vertical,
        rel
      }
      return templateParam
    }
  },
}
</script>
<style lang="less" scoped></style>
