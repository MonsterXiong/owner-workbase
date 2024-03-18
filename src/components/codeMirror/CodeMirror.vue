<template>
  <div class="in-coder-panel" ref="codeMirrorRef">
    <textarea v-model="value" :ref="realRefCode"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
import _CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/eclipse.css'
// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
// 如果有Java c++语言设置需求，需要 引入clike.js
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/python/python'
import 'codemirror/mode/r/r'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/markdown/markdown'
// 设置光标所在行高亮工具包
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'
// 引入代码自动提示
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/javascript-hint'
import './custom-javascript-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/anyword-hint'

// 自动括号匹配
import 'codemirror/addon/edit/matchbrackets'
// 快捷键
import 'codemirror/keymap/sublime'

export default {
  name: 'CodeMirror',
  props: {
    value: {
      type: [String, Number, Boolean, Array],
      default: '',
    },
    disabled: { type: Boolean, default: false },
    language: { type: String, default: 'javascript' }, // 语法类型
    theme: { type: String, default: 'eclipse' }, // 主题
    refCode: String
  },
  data() {
    return {
      code: '',
      // 默认的语法类型
      mode: 'Vue',
      // 编辑器实例
      coder: null,
      // 默认配置
      options: {
        // 缩进格式
        tabSize: 2,
        smartIndent: true, // 开启自动缩进
        // 主题，对应主题库 JS 需要提前引入
        theme: this.theme,
        // 显示行号
        lineNumbers: true,
        line: true, // 检查格式
        styleActiveLine: true, // 高亮光标所在行
        matchBrackets: true, // 自动匹配括号
        hintOptions: {
          // 避免由于提示列表只有一个提示信息时，自动填充
          completeSingle: false,
        },
        readOnly: this.disabled
      },
      modes: [
        {
          value: 'css',
          label: 'CSS',
        },
        {
          value: 'javascript',
          label: 'Javascript',
        },
        {
          value: 'html',
          label: 'XML/HTML',
        },
        {
          value: 'x-java',
          label: 'Java',
        },
        {
          value: 'x-objectivec',
          label: 'Objective-C',
        },
        {
          value: 'x-python',
          label: 'Python',
        },
        {
          value: 'x-rsrc',
          label: 'R',
        },
        {
          value: 'x-sh',
          label: 'Shell',
        },
        {
          value: 'x-sql',
          label: 'SQL',
        },
        {
          value: 'x-swift',
          label: 'Swift',
        },
        {
          value: 'x-vue',
          label: 'Vue',
        },
        {
          value: 'markdown',
          label: 'Markdown',
        },
      ],
    }
  },
  computed: {
    codemirror() {
      return this.$refs[this.refCode].codemirror
    },
  },
  watch: {
    value: {
      handler(v) {
        if (this.code !== v) {
          this.code = v
          if (this.coder) {
            this.coder.setValue(v == null ? '' : v)
            this.coder.refresh()
          }
        }
      },
      immediate: true,
    },
    language: {
      handler(v) {
        this.setLanguage()
      },
      immediate: true,
    },
    disabled() {
      this.coder.setOption('readOnly', this.disabled)
    }
  },

  created() {
    this.realRefCode = this.refCode + "Ref"
  },
  mounted() {
    this.$nextTick(() => {
      this.initialize()
    })
  },
  methods: {
    refresh() {
       this.coder.refresh()
    },
    // 初始化
    initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = _CodeMirror.fromTextArea(this.$refs[this.realRefCode], this.options)
      // 编辑器赋值
      this.coder.setValue(this.value || this.code)
      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue()
        if (this.$emit) {
          this.$emit('input', this.code)
          this.$emit('change', this.code)
        }
      })
      this.coder.setSize('', '100%')
      // 尝试从父容器获取语法类型
      this.setLanguage()
      // cursorActivity | inputRead
      this.coder.on('inputRead', () => {
        // 将用户自定义的关键词传入CodeMirror，并在javascript-hint中做匹配
        _CodeMirror.ukeys = ['name', 'demo', 'dam', 'dem', 'dom', 'helloword']
        // 调用显示提示
        this.coder.showHint()
        let hints = document.querySelector('.CodeMirror-hints')
        // 设置 提示框的z-index
        if(hints?.style) {
          hints.style.zIndex = 3001
        }
      })
    },
    setCode(code) {
      if (this.coder) {
        this.coder.setValue(code)
      } else {
        this.error()
      }
    },
    error() {
      this.$message.error('编辑器还没准备好，稍后再试。')
    },
    setLanguage() {
      // 获取具体的语法类型对象
      const modeObj = this.getLanguage(this.language)
      // 判断父容器传入的语法是否被支持
      if (modeObj) {
        this.mode = modeObj.label
      }
    },
    // 获取当前语法类型
    getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        const currentLanguage = language.toLowerCase()
        const currentLabel = mode.label.toLowerCase()
        const currentValue = mode.value.toLowerCase()

        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        )
      })
    },
    // 更改模式
    changeMode(val) {
      // 修改编辑器的语法配置
      if (this.coder) {
        this.coder.setOption('mode', `text/${val}`)
      } else {
        this.error()
      }
      // 获取修改后的语法
      const label = this.getLanguage(val).label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    },

  },
}
</script>

<style lang="less" scoped>
.in-coder-panel {
  margin-bottom: 10px;
  font-size: 20px;
}
/deep/ .cm-s-3024-day span.cm-string {
  color: #3a3432;
}
</style>
