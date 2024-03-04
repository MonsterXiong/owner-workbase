import { service } from '../../http'

export default class GenToolExtendService {
  static async genAdapter(params) {
    return service.post(`/gen-tool/quickGenAdapter`, params)
  }
  static async quickGenCategoryType(params) {
    return service.post(`/gen-tool/quickGenCategoryType`, params)
  }
  static async quickGenComponentTemplate(params) {
    return service.post(`/gen-tool/quickGenComponentTemplate`, params)
  }
}
