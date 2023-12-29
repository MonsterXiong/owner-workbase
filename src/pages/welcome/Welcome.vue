<template>
  <div class="common-page welcome-page">
    <div class="left">
      <MenuList :menuList="categoryList" :menuKey="menuKey" headerTitle="分类" @onClick="changeActiveMenu">
        <template #ext>
          <i class="el-icon-plus" @click="onAddCategory"></i>
        </template>
      </MenuList>
    </div>
    <div class="right">
      <div class="header-wrapper" style="">
        <div class="header-title">导航列表</div>
        <div class="operation-wrapper">
         <i class=" el-icon-search"></i>
         <span>添加数据</span>
         <span>编辑</span>
        </div>
      </div>
      <div style="height:calc(100% - 41px)">

        <NavCard :list="navList"/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from '@/components/menuList/MenuList'
import NavCard from './components/NavCard'
import {categoryList,urlList,CATEGORY_TYPE} from './mockData'
export default {
  components: {
    MenuList,
    NavCard
  },
  data() {
    return {
      categoryList,
      urlList,
      currentActiveMenu: '',
      menuKey:'code',
      navList:[]
    }
  },
  methods: {
    changeActiveMenu(menuKey){
      console.log(menuKey);
      this.currentActiveMenu = menuKey
      if(menuKey == CATEGORY_TYPE.ALL){
        this.navList = categoryList.filter(category=>category[this.menuKey]!= CATEGORY_TYPE.ALL).map(category=>{
          return {
            ...category,
            navList:urlList.filter(item=>item.categoryId == category[this.menuKey]) || []
          }
        })

      }else{
        const group = categoryList.find(item=>item[this.menuKey] == menuKey)
        const navList = urlList.filter(item=>item.categoryId == menuKey) || []
        this.navList = [{
          ...group,
          navList
        }]
      }
      console.log(this.navList,'this.navList');

      // this.message = categoryList.find(item=>item.id == menuKey).name
    },
    onAddCategory() {

      console.log('添加');
    },
  },
}
</script>

<style lang="less" scoped>
.welcome-page {
  height: 100%;
  display: flex;
}

.left {
  width: 260px;
  height: 100%;
  background: @layout-bg-color;
  margin-right: 12px;
  border-radius: 6px;
  border:1px @border-type @border-color--primary;
  i {
      font-size: 18px;
      cursor: pointer;
      margin-left: auto;
      color: @font-color--primary
    }
}

.right {
  background: @layout-bg-color;
  flex: 1;
  border-radius: 6px;
  overflow: hidden;
  border:1px @border-type @border-color--primary;
  .header-wrapper{
    line-height: 40px;
    text-align: center;
    color: @font-color--primary;
    border-bottom: 1px @border-type @border-color--primary;
    display:flex;
    align-items: center;
    padding:0 10px;
    // color:@white-color;
    // background-color: @bg-color--primary;
    .header-title{
      font-weight: bolder;
      font-size: 20px;
      flex:1
    }
    .operation-wrapper{
      margin-left:auto;
      display: flex;
      align-items: center;
      i{
        cursor:pointer;
      }
      >span{
        font-size: 14px;
        margin-left:10px;
        cursor:pointer;
      }
    }
  }
}

</style>
