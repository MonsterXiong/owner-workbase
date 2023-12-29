// import App from '@/App.vue'
// import router from '@/router'
// import store from '@/store'
// import EnumData from '@/utils/init.js'

// import { SystemConfigService } from '@/services'
// import { dictCategory } from './common/constants'

// let categoryKeys = []
// Object.values(dictCategory).forEach((value) => {
//   categoryKeys.push(value)
// })

// const init = async (Vue) => {
//   let EnumInstance = null
//   try {
//     const {data} = await SystemConfigService.getEnumList(categoryKeys)
//     EnumInstance = new EnumData(data)
//   } catch (error) {
//     // 出错了
//   }finally{
//     const vueVm = new Vue({
//       router,
//       store,
//       render: (h) => h(App),
//     }).$mount('#app')
//     vueVm.getAllEnum = EnumInstance?.getAllEnum
//     vueVm.getEnumByCode = EnumInstance?.getEnumByCode
//     vueVm.getEnumMeaning = EnumInstance?.getEnumMeaning
//   }
// }

// export default init
