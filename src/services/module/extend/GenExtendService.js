import { service } from '../../http'

export default class GenExtendService {
  static async genProject(params) {
    return service.post(`/gen/genProject`, params, {
      responseType: 'blob',
    })
  }
}
