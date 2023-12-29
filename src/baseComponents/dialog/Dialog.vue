<template>
  <el-dialog v-bind="Object.assign({}, defaultOptions, $data.$_attrs)" v-on="$data.$_listeners" v-dragdialog class="form-dialog">
    <template v-slot:title><slot name="title" /></template>
    <template v-slot>
      <slot />
    </template>
    <template v-slot:footer><slot name="footer" /></template>
  </el-dialog>
</template>

<script>
import { attrsListenersHack } from './mixins'

export default {
  mixins: [attrsListenersHack],
  data() {
    return {
      defaultOptions: Object.freeze({
        width: '700px',
        modal: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        appendToBody: true,
      }),
    }
  },

  methods: {},
}
</script>

<style lang="less" scoped>
.el-icon-loading {
  font-size: 26px;
  color: #001529;
}
</style>
