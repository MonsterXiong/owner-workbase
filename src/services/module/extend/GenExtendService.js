import { service } from '../../http'

export default class GenExtendService {
  static async genProject(params) {
    return service.post(`/gen/genProject`, params, {
      responseType: 'blob',
    })
  }
  static async genSfProjectByProjectId(projectId) {
    return service.postQueryToBlob(`gen/genSfProjectByProjectId`, { projectId })
  }
}
