import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/icomoon.js'
import '@/assets/iconfont/iconfont-txjm.js'
import '@/assets/iconfont/iconfont-txjm.css'
import animate from 'animate.css'
import '@/style/index.less'
// import 'default-passive-events'
// import 'splitpanes/dist/splitpanes.css'


// //阻止浏览器默认右键菜单
// window.addEventListener('contextmenu', (event) => event.preventDefault())
// //修改名称
// window.onload = () => {
//   window.document.title = configData.systemName
// }

// 引入静态资源
export const setupAssets = (Vue) => {
  Vue.use(animate)
}
