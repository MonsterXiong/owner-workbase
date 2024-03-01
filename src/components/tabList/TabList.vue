<template>
  <div class="tab-wrapper">
    <div v-for="(item,index) in tabList" class="tab-item" :key="index" :class="{'active':currentActive == item.value}" @click="onClick(item)">
      <div class="label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentActive: {},
      tabList:{}
    },
    methods:{
      onClick(tabItem){
        this.$emit('update:currentActive',tabItem.value)
      }
    }
  }
</script>

<style lang="less" scoped>
.tab-wrapper{
  display: flex;
  align-items: center;
  gap:10px;
  height: 100%;
  border-radius: 4px;
  padding: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.tab-item{
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color:#356191;
  border-width:1px;
  height: 30px;
  &.active{
    border:1px dashed #356191;
    font-weight: bold;
  }
  >.label{
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
