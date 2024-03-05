import { service } from '../../http'

export default class GenToolExtendService {
  static async genAdapter(params) {
    return service.post(`/genTool/quickGenAdapter`, params)
  }
  static async quickGenCategoryType(params) {
    return service.post(`/genTool/quickGenCategoryType`, params)
  }
  static async quickGenComponentTemplate(params) {
    return service.post(`/genTool/quickGenComponentTemplate`, params)
  }
}
