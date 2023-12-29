<template>
  <base-dialog :title="title" v-dragdialog :width="dialogWidth" :visible.sync="visible" :before-close="onCancel">
    111
  </base-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: 'xxx',
      visible: false,
      dialogWidth: '700px',
    }
  },

  methods: {
    show(data, ) {
      this.visible = true
    },
    onSubmit() {

    },
    onClose() {
      this.visible = false
    },
    onCancel() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped></style>
