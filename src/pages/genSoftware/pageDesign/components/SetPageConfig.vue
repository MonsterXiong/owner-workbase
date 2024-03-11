<template>
  <div class="common-page set-page-config">
    <template v-if="isModule">
      <div>这是模块</div>
    </template>
    <template v-else>
      <template v-if="currentComponent">
        <div class="common-page">
          <div style="border:1px dashed #999;display: flex;align-items: center;padding:0 5px;margin-bottom:5px;">
            <div style="flex:1;font-size:16px;font-weight: bold;text-align: center;">{{currentComponentName}}</div>
            <el-button type="text" style="margin-left:auto" @click="onSave">保存</el-button>
          </div>
          <div style="height:calc(100% - 45px);">
            <component :is="currentComponent" :projectId="projectId" :menuDetailInfo="currentMenuDetail"  ref="dynamicCompRef"></component>
          </div>
        </div>
      </template>
      <template v-else>空页面</template>
    </template>
  </div>
</template>

<script>
import { COMPONENT_MAP } from '../template/index'
import { SfMenuDetailService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
import { PAGE_LIST } from '../../constant/pageList'
import { CATEGORY_LIST } from '../../constant/pageCategoryList'
export default {
  data() {
    return {
      menuParam: {},
      currentMenuDetail: {},
    }
  },
  props: {
    projectId:{},
    currentActivePage: {},
  },
  computed: {
    isModule() {
      return this.currentActivePage?.menuType == 'module'
    },
    currentComponent() {
      return COMPONENT_MAP[this.menuParam?.type]
    },
    currentComponentName(){
      const {categoryType,type } = this.menuParam
      const typeName = PAGE_LIST.find(item=>item.value === type)?.label
      const categoryName = CATEGORY_LIST.find(item=>item.value === categoryType)?.label
      return `${categoryName} - ${typeName}`
    }
  },
  watch: {
    currentActivePage(newValue) {
      if (newValue.menuId) {
        this.$nextTick(()=>{
          this.getMenuDetail()
        })
      }
    },
  },
  methods: {
    async onSave(){
      const templateParam = this.$refs.dynamicCompRef.getInfo()
      if(!templateParam){
        return this.$message.warning('请填写所需数据')
      }
      const pageConfigInfo = {
        ...this.menuParam,
        templateParam
      }
      await SfMenuDetailService.saveSfMenuDetail({
        menuDetailId:this.currentMenuDetail?.menuDetailId || '',
        bindMenu: this.currentActivePage.menuId,
        menuParam:JSON.stringify(pageConfigInfo)
      })
      this.$message.success('保存成功')
      this.getMenuDetail()

    },
    refresh(menuId) {
      this.getMenuDetail(menuId)
    },
    getCurrentMenuDetail() {
      return this.currentMenuDetail
    },
    async getMenuDetail(menuId) {
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bindMenu', menuId ? menuId : this.currentActivePage.menuId)
      const { data } = await SfMenuDetailService.querySfMenuDetail(queryCondition)
      if (data?.length) {
        this.currentMenuDetail = data[0]
        const { menuParam } = data[0]
        if (menuParam) {
          this.menuParam = JSON.parse(menuParam)
        } else {
          this.menuParam = {}
        }
      } else {
        this.menuParam = {}
      }
    },
  },
}
</script>

<style lang="less" scoped>
.set-page-config{
  padding: 10px
}
</style>
