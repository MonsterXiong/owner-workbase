<template>
  <BaseDialog :title="dialogTitle" :visible="dialogVisible" :before-close="onDialogClose" :width="dialogWidth">
    <div class="common-page">
      <div style="display: flex;gap:10px;height: 600px">
        <div class="tab-wrapper">
          <div
            v-for="item in pageCodeList"
            :key="item.filePath"
            @click="currentPath = item.filePath"
            :class="{ active: currentPath == item.filePath }"
            class="tab-item"
          >
            {{ item.filePath }}
          </div>
        </div>
        <CodeMirror style="height: 100%;width:calc(100% - 250px)" :value="codeContent" :disabled="false" ref="codeMirror" language="x-vue" />
      </div>
    </div>
    <template slot="footer">
      <el-button size="mini" style="margin-right: 10px" @click="onCopy">复制</el-button>
    </template>
  </BaseDialog>
</template>

<script>
import CodeMirror from '@/components/codeMirror/CodeMirror'
import handleClipboard from '@/utils/clipboard'
export default {
  components: {
    CodeMirror,
  },
  computed: {
    codeContent() {
      return this.pageCodeList.find((item) => item.filePath == this.currentPath)?.content || '暂无代码'
    },
  },
  data() {
    return {
      dialogTitle: '预览代码',
      dialogVisible: false,
      dialogWidth: '80%',
      currentPath: '',
      pageCodeList: [],
      formRules: {},
    }
  },
  methods: {
    show(pageCodeList) {
      this.pageCodeList = pageCodeList
      if (!this.currentPath && pageCodeList.length) {
        this.currentPath = pageCodeList[0].filePath
      }
      this.dialogVisible = true
    },
    onCopy(event) {
      handleClipboard(this.codeContent, event)
    },
    onReset() {
        this.pageCodeList = []
        this.currentPath = ""
    },
    onDialogClose() {
        this.onReset()
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.tab-wrapper {
  // display: flex;
  height:100%;
  overflow-y: auto;
  .tab-item {
    padding: 5px;
    width: 235px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #eee;
    cursor: pointer;
    &.active,
    &:hover {
      border: 1px dashed #356491;
      background: #356491;
      color: #fff;
    }
  }
}
</style>
