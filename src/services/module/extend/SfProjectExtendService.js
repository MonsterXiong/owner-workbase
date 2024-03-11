import { service } from '../../http'

export default class SfProjectExtendService {
  static async saveProject(params) {
    return service.post(`/sfProjectExtend/saveProject`, params)
  }
  static async getTableByProjectId(projectId) {
    return service.postQuery(`/sfProjectExtend/getTableByProjectId`, {projectId})
  }
  static async getFieldByProjectId(projectId,tableName) {
    return service.postQuery(`/sfProjectExtend/getFieldByProjectId`, {projectId,tableName})
  }
  static async syncProjectToSf(projectId,jsonData) {
    return service.post(`/sfProjectExtend/syncProjectToSf?projectId=${projectId}`, jsonData)
  }
}
