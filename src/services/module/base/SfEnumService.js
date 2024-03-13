import { service } from '@/services/http'

/**
 * 关于枚举的服务
 */
export default class SfEnumService {
  /**
   * @description 删除枚举(批量、递归)
   * @returns
   */
  static async deleteSfEnumBatch(enumIdList) {
    return service.post('/sfBase/sfEnum/deleteSfEnumBatch', enumIdList)
  }

  /**
   * @description 导入枚举模板下载
   * @returns
   */
  static async downloadSfEnumTemplate() {
    return service.postFormData('/sfBase/sfEnum/downloadSfEnumTemplate', {})
  }

  /**
   * @description 导出枚举
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfEnum(queryCondition) {
    return service.post('/sfBase/sfEnum/exportSfEnum', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取枚举
   * @param {String} enumId 枚举主键
   * @returns
   */
  static async getSfEnum(enumId) {
    return service.postQuery('/sfBase/sfEnum/getSfEnum', { enumId })
  }

  /**
   * @description 导入枚举
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfEnum(file) {
    return service.postForm('/sfBase/sfEnum/importSfEnum', { file })
  }

  /**
   * @description 增加枚举
   * @returns
   */
  static async insertSfEnum(params) {
    return service.post('/sfBase/sfEnum/insertSfEnum', params)
  }

  /**
   * @description 增加枚举(批量)
   * @returns
   */
  static async insertSfEnumBatch(sfEnumList) {
    return service.post('/sfBase/sfEnum/insertSfEnumBatch', sfEnumList)
  }

  /**
   * @description 查询枚举列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfEnum(queryCondition) {
    return service.post('/sfBase/sfEnum/querySfEnum', queryCondition)
  }

  /**
   * @description 保存枚举
   * @returns
   */
  static async saveSfEnum(sfEnumDTO) {
    return service.post('/sfBase/sfEnum/saveSfEnum', sfEnumDTO)
  }

  /**
   * @description 保存枚举(批量)
   * @returns
   */
  static async saveSfEnumBatch(params) {
    return service.post('/sfBase/sfEnum/saveSfEnumBatch', params)
  }

  /**
   * @description 修改枚举
   * @returns
   */
  static async updateSfEnum(params) {
    return service.post('/sfBase/sfEnum/updateSfEnum', params)
  }

  /**
   * @description 修改枚举(批量)
   * @returns
   */
  static async updateSfEnumBatch(sfEnumList) {
    return service.post('/sfBase/sfEnum/updateSfEnumBatch', sfEnumList)
  }
}
