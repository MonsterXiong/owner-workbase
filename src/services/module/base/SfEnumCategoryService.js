import { service } from '@/services/http'

/**
 * 关于枚举类别的服务
 */
export default class SfEnumCategoryService {
  /**
   * @description 删除枚举类别(批量、递归)
   * @returns
   */
  static async deleteSfEnumCategoryBatch(enumCategoryIdList) {
    return service.post('/sfBase/sfEnumCategory/deleteSfEnumCategoryBatch', enumCategoryIdList)
  }

  /**
   * @description 导入枚举类别模板下载
   * @returns
   */
  static async downloadSfEnumCategoryTemplate() {
    return service.postFormData('/sfBase/sfEnumCategory/downloadSfEnumCategoryTemplate', {})
  }

  /**
   * @description 导出枚举类别
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfEnumCategory(queryCondition) {
    return service.post('/sfBase/sfEnumCategory/exportSfEnumCategory', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取枚举类别
   * @param {String} enumCategoryId 枚举类别主键
   * @returns
   */
  static async getSfEnumCategory(enumCategoryId) {
    return service.postQuery('/sfBase/sfEnumCategory/getSfEnumCategory', { enumCategoryId })
  }

  /**
   * @description 导入枚举类别
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfEnumCategory(file) {
    return service.postForm('/sfBase/sfEnumCategory/importSfEnumCategory', { file })
  }

  /**
   * @description 增加枚举类别
   * @returns
   */
  static async insertSfEnumCategory(params) {
    return service.post('/sfBase/sfEnumCategory/insertSfEnumCategory', params)
  }

  /**
   * @description 增加枚举类别(批量)
   * @returns
   */
  static async insertSfEnumCategoryBatch(sfEnumCategoryList) {
    return service.post('/sfBase/sfEnumCategory/insertSfEnumCategoryBatch', sfEnumCategoryList)
  }

  /**
   * @description 查询枚举类别列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfEnumCategory(queryCondition) {
    return service.post('/sfBase/sfEnumCategory/querySfEnumCategory', queryCondition)
  }

  /**
   * @description 保存枚举类别
   * @returns
   */
  static async saveSfEnumCategory(sfEnumCategoryDTO) {
    return service.post('/sfBase/sfEnumCategory/saveSfEnumCategory', sfEnumCategoryDTO)
  }

  /**
   * @description 保存枚举类别(批量)
   * @returns
   */
  static async saveSfEnumCategoryBatch(params) {
    return service.post('/sfBase/sfEnumCategory/saveSfEnumCategoryBatch', params)
  }

  /**
   * @description 修改枚举类别
   * @returns
   */
  static async updateSfEnumCategory(params) {
    return service.post('/sfBase/sfEnumCategory/updateSfEnumCategory', params)
  }

  /**
   * @description 修改枚举类别(批量)
   * @returns
   */
  static async updateSfEnumCategoryBatch(sfEnumCategoryList) {
    return service.post('/sfBase/sfEnumCategory/updateSfEnumCategoryBatch', sfEnumCategoryList)
  }
}
