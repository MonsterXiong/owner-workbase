<template>
    <div class="tool-bar">
      <el-form inline>
        <el-button size="mini" type="primary" @click="onAdd" style="margin-right:10px">新增</el-button>
        <el-button size="mini" type="danger" @click="onBatchDelete">批量删除</el-button>
      </el-form>
    </div>
</template>

<script>
  export default {
    methods: {
      onAdd() {
        this.$emit('add')
      },
      onBatchDelete() {
        this.$emit('batchDelete')
      },
    },
  }
</script>

<style lang="less" scoped>
  .tool-bar {
    line-height: 40px;
    padding: 0 10px;
    text-align: end;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
</style>
