import { service } from '../../http/index.js'

/**
 * 关于项目的服务
 */
export default class SfProjectService {
  /**
   * @description 删除项目(批量、递归)
   * @returns
   */
  static async deleteSfProjectBatch(projectIdList) {
    return service.post('/sfBase/sfProject/deleteSfProjectBatch', projectIdList)
  }

  /**
   * @description 导入项目模板下载
   * @returns
   */
  static async downloadSfProjectTemplate() {
    return service.postFormData('/sfBase/sfProject/downloadSfProjectTemplate', {})
  }

  /**
   * @description 导出项目
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfProject(queryCondition) {
    return service.post('/sfBase/sfProject/exportSfProject', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取项目
   * @param {String} projectId 项目主键
   * @returns
   */
  static async getSfProject(projectId) {
    return service.postQuery('/sfBase/sfProject/getSfProject', { projectId })
  }

  /**
   * @description 导入项目
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfProject(file) {
    return service.postForm('/sfBase/sfProject/importSfProject', { file })
  }

  /**
   * @description 增加项目
   * @returns
   */
  static async insertSfProject(params) {
    return service.post('/sfBase/sfProject/insertSfProject', params)
  }

  /**
   * @description 增加项目(批量)
   * @returns
   */
  static async insertSfProjectBatch(sfProjectList) {
    return service.post('/sfBase/sfProject/insertSfProjectBatch', sfProjectList)
  }

  /**
   * @description 查询项目列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfProject(queryCondition) {
    return service.post('/sfBase/sfProject/querySfProject', queryCondition)
  }

  /**
   * @description 保存项目
   * @returns
   */
  static async saveSfProject(sfProjectDTO) {
    return service.post('/sfBase/sfProject/saveSfProject', sfProjectDTO)
  }

  /**
   * @description 保存项目(批量)
   * @returns
   */
  static async saveSfProjectBatch(params) {
    return service.post('/sfBase/sfProject/saveSfProjectBatch', params)
  }

  /**
   * @description 修改项目
   * @returns
   */
  static async updateSfProject(params) {
    return service.post('/sfBase/sfProject/updateSfProject', params)
  }

  /**
   * @description 修改项目(批量)
   * @returns
   */
  static async updateSfProjectBatch(sfProjectList) {
    return service.post('/sfBase/sfProject/updateSfProjectBatch', sfProjectList)
  }
}
