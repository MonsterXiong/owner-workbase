import { MessageBox, Message } from 'element-ui'

export const tools = {
  message(msg, options) {
    Message.closeAll()
    Message(Object.assign({ type: 'success', message: msg, duration: 500 }, options))
  },

  confirm(message, options) {
    return MessageBox(
      Object.assign(
        {
          type: 'warning',
          title: '提示',
          message,
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定',
        },
        options
      )
    )
  },
}

export default tools
