import { service } from '@/services/http'

/**
 * 关于数据池的服务
 */
export default class SfMenuDetailService {
  /**
   * @description 删除数据池(批量、递归)
   * @returns
   */
  static async deleteSfMenuDetailBatch(menuDetailIdList) {
    return service.post('/sfBase/sfMenuDetail/deleteSfMenuDetailBatch', menuDetailIdList)
  }

  /**
   * @description 导入数据池模板下载
   * @returns
   */
  static async downloadSfMenuDetailTemplate() {
    return service.postFormData('/sfBase/sfMenuDetail/downloadSfMenuDetailTemplate', {})
  }

  /**
   * @description 导出数据池
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfMenuDetail(queryCondition) {
    return service.post('/sfBase/sfMenuDetail/exportSfMenuDetail', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取数据池
   * @param {String} menuDetailId 数据池主键
   * @returns
   */
  static async getSfMenuDetail(menuDetailId) {
    return service.postQuery('/sfBase/sfMenuDetail/getSfMenuDetail', { menuDetailId })
  }

  /**
   * @description 导入数据池
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfMenuDetail(file) {
    return service.postForm('/sfBase/sfMenuDetail/importSfMenuDetail', { file })
  }

  /**
   * @description 增加数据池
   * @returns
   */
  static async insertSfMenuDetail(params) {
    return service.post('/sfBase/sfMenuDetail/insertSfMenuDetail', params)
  }

  /**
   * @description 增加数据池(批量)
   * @returns
   */
  static async insertSfMenuDetailBatch(sfMenuDetailList) {
    return service.post('/sfBase/sfMenuDetail/insertSfMenuDetailBatch', sfMenuDetailList)
  }

  /**
   * @description 查询数据池列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfMenuDetail(queryCondition) {
    return service.post('/sfBase/sfMenuDetail/querySfMenuDetail', queryCondition)
  }

  /**
   * @description 保存数据池
   * @returns
   */
  static async saveSfMenuDetail(sfMenuDetailDTO) {
    return service.post('/sfBase/sfMenuDetail/saveSfMenuDetail', sfMenuDetailDTO)
  }

  /**
   * @description 保存数据池(批量)
   * @returns
   */
  static async saveSfMenuDetailBatch(params) {
    return service.post('/sfBase/sfMenuDetail/saveSfMenuDetailBatch', params)
  }

  /**
   * @description 修改数据池
   * @returns
   */
  static async updateSfMenuDetail(params) {
    return service.post('/sfBase/sfMenuDetail/updateSfMenuDetail', params)
  }

  /**
   * @description 修改数据池(批量)
   * @returns
   */
  static async updateSfMenuDetailBatch(sfMenuDetailList) {
    return service.post('/sfBase/sfMenuDetail/updateSfMenuDetailBatch', sfMenuDetailList)
  }
}
