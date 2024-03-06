<template>
  <div class="common-page set-page-config">
    <template v-if="isModule">
      <div>这是模块</div>
    </template>
    <template v-else>
      <template v-if="currentComponent">
        <component :is="currentComponent" :projectId="projectId"></component>
      </template>
      <template v-else>空页面</template>
    </template>
  </div>
</template>

<script>
import { COMPONENT_MAP } from '../template/index'
import { SfMenuDetailService } from '@/services'
import QueryConditionBuilder from '@/utils/queryConditionBuilder'
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
  },
  watch: {
    currentActivePage(newValue) {
      if (newValue.menuId) {
        this.getMenuDetail()
      }
    },
  },
  methods: {
    refresh(menuId) {
      this.getMenuDetail(menuId)
    },
    getCurrentMenuDetail() {
      return this.currentMenuDetail
    },
    async getMenuDetail(menuId) {
      const queryCondition = QueryConditionBuilder.getInstanceNoPage()
      queryCondition.buildEqualQuery('bind_menu', menuId ? menuId : this.currentActivePage.menuId)
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
