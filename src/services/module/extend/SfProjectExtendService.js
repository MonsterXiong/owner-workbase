import { service } from '../../http'

export default class SfProjectExtendService {
  static async saveProject(params) {
    return service.post(`/sfProjectExtend/saveProject`, params)
  }
}
