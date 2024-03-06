import { service } from '@/services/http'

/**
 * 关于项目配置的服务
 */
export default class SfProjectConfigService {
  /**
   * @description 删除项目配置(批量、递归)
   * @returns
   */
  static async deleteSfProjectConfigBatch(projectConfigIdList) {
    return service.post('/sfBase/sfProjectConfig/deleteSfProjectConfigBatch', projectConfigIdList)
  }

  /**
   * @description 导入项目配置模板下载
   * @returns
   */
  static async downloadSfProjectConfigTemplate() {
    return service.postFormData('/sfBase/sfProjectConfig/downloadSfProjectConfigTemplate', {})
  }

  /**
   * @description 导出项目配置
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfProjectConfig(queryCondition) {
    return service.post('/sfBase/sfProjectConfig/exportSfProjectConfig', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取项目配置
   * @param {String} projectConfigId 项目配置主键
   * @returns
   */
  static async getSfProjectConfig(projectConfigId) {
    return service.postQuery('/sfBase/sfProjectConfig/getSfProjectConfig', { projectConfigId })
  }

  /**
   * @description 导入项目配置
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfProjectConfig(file) {
    return service.postForm('/sfBase/sfProjectConfig/importSfProjectConfig', { file })
  }

  /**
   * @description 增加项目配置
   * @returns
   */
  static async insertSfProjectConfig(params) {
    return service.post('/sfBase/sfProjectConfig/insertSfProjectConfig', params)
  }

  /**
   * @description 增加项目配置(批量)
   * @returns
   */
  static async insertSfProjectConfigBatch(sfProjectConfigList) {
    return service.post('/sfBase/sfProjectConfig/insertSfProjectConfigBatch', sfProjectConfigList)
  }

  /**
   * @description 查询项目配置列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfProjectConfig(queryCondition) {
    return service.post('/sfBase/sfProjectConfig/querySfProjectConfig', queryCondition)
  }

  /**
   * @description 保存项目配置
   * @returns
   */
  static async saveSfProjectConfig(sfProjectConfigDTO) {
    return service.post('/sfBase/sfProjectConfig/saveSfProjectConfig', sfProjectConfigDTO)
  }

  /**
   * @description 保存项目配置(批量)
   * @returns
   */
  static async saveSfProjectConfigBatch(params) {
    return service.post('/sfBase/sfProjectConfig/saveSfProjectConfigBatch', params)
  }

  /**
   * @description 修改项目配置
   * @returns
   */
  static async updateSfProjectConfig(params) {
    return service.post('/sfBase/sfProjectConfig/updateSfProjectConfig', params)
  }

  /**
   * @description 修改项目配置(批量)
   * @returns
   */
  static async updateSfProjectConfigBatch(sfProjectConfigList) {
    return service.post('/sfBase/sfProjectConfig/updateSfProjectConfigBatch', sfProjectConfigList)
  }
}
