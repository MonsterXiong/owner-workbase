<template>
  <div>
    <AddProjectDialog />
    <OpenFieldConfigDialog />
  </div>
</template>

<script>
import AddProjectDialog from './addProject/AddProjectDialog'
import OpenFieldConfigDialog from './openFieldConfigDialog/OpenFieldConfigDialog'
export default {
  components: {
    AddProjectDialog,
    OpenFieldConfigDialog
  },
}
</script>

<style lang="less" scoped>
</style>
