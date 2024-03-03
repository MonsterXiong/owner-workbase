

import http from '../../database.js'

export default  class GenToolExtendService{
  static async genAdapter(params) {
    return http.post(`/gen-tool/quickGenAdapter`, params)
  }
  static async quickGenCategoryType(params) {
    return http.post(`/gen-tool/quickGenCategoryType`, params)
  }
  static async quickGenComponentTemplate(params) {
    return http.post(`/gen-tool/quickGenComponentTemplate`, params)
  }
}
