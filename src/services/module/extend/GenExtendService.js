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
  static async genSfServiceByProjectId(projectId) {
    return service.postQueryToBlob(`gen/genSfServiceByProjectId`, { projectId })
  }
  static async genSfEnumByProjectId(projectId) {
    return service.postQueryToBlob(`gen/genSfEnumByProjectId`, { projectId })
  }
  static async downloadSfPageCodeByMenuId(menuId) {
    return service.postQueryToBlob(`/gen/downloadSfPageCodeByMenuId`, { menuId })
  }
  static async genSfPageCodeByMenuId(menuId) {
    return service.postQuery(`gen/genSfPageCodeByMenuId`, { menuId })
  }
}
