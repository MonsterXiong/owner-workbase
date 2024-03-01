<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
      <div class="common-page page-detail">
      <div style="height:40px">
        <TabList :currentActive.sync="currentActiveCategory" :tabList="categoryList"></TabList>
      </div>
      <div class="page-param-detail">
        <template v-if="currentPageList.length">
          <div class="page-param">
            <div v-for="(item,index) in currentPageList" :key="index" @click="onClick(item)" class="page-list-item" :class="{active:currentActivePageType == item.value}">
              {{ item.label }}
            </div>
          </div>

        </template>
        <template v-else>
            <el-empty description="暂无数据" style="margin:0 auto">
              <el-button type="primary" size="mini">添加</el-button>
            </el-empty>
        </template>


      </div>
    </div>
    <template slot="footer">
      <el-button size="mini" style="margin-right:10px">新 增</el-button>
      <el-button size="mini" @click="onDialogClose" style="margin-right:10px">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSubmit">确 定</el-button>
    </template>
  </BaseDialog>

</template>

<script>
import TabList from '@/components/tabList/TabList.vue'
import {  CATEGORY_TYPE,} from '../../constant/pageCategoryType'
import { CATEGORY_LIST } from '../../constant/pageCategoryList'
import { PAGE_LIST } from '../../constant/pageList'
export default {
  data() {
    return {
      currentActiveCategory: CATEGORY_TYPE.COMPOSE,
      categoryList: CATEGORY_LIST,
      currentPageList: [],
      currentActivePageType:'',
      dialogTitle:'设计页面',
      dialogVisible:false,
      dialogWidth:'700px'
    }
  },
  components: {
    TabList,
  },
  watch: {
    currentActiveCategory: {
      handler(newValue) {
        if (newValue) {
          this.currentPageList = PAGE_LIST.filter((item) => item.category == newValue)
          this.currentActivePageType = ''
        } else {
          this.currentPageList = []
        }
      },
      immediate: true,
    },
  },
  methods:{
    show(){
      this.dialogVisible = true
    },
    onSubmit(){
      this.$emit('onClick',this.currentActivePageType)
      this.onDialogClose()
    },
    onClick(pageItem){
      this.currentActivePageType = pageItem.value
    },
    onReset(){
      this.currentActivePageType=""
    },
    onDialogClose(){
      this.dialogVisible = false
      this.onReset()
    }
  },
}
</script>

<style lang="less" scoped>
.page-detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .page-param-detail{
    height: calc(100% - 40px);
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .page-param {
    height: 100%;
    min-height: 340px;
    gap: 10px;
    overflow: auto;
  }
}

.page-list-item{
  width:calc(calc(100% - 30px) / 4);
  height:50px;
  display: inline-block;
  line-height: 50px;
  text-align: center;
  border:1px dashed #ccc;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  &:nth-child(4n){
    margin-right: 0;
  }
  &.active{
    border:1px dashed #356191;
    color:#356191
  }
}
</style>
