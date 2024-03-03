import http from '../../database'

/**
 *  * 关于的服务
 *  */
export default class WfGenProjectService {
  /**
   * @description 删除(批量、递归)
   * @returns
   */
  static async deleteWfGenProjectBatch(idList) {
    return http.post('/wfBase/wfGenProject/deleteWfGenProjectBatch', idList)
  }

  /**
   * @description 导入模板下载
   * @returns
   */
  static async downloadWfGenProjectTemplate() {
    return http.postFormData('/wfBase/wfGenProject/downloadWfGenProjectTemplate', {})
  }

  /**
   * @description 导出
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportWfGenProject(queryCondition) {
    return http.post('/wfBase/wfGenProject/exportWfGenProject', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取
   * @param {String} id 主键
   * @returns
   */
  static async getWfGenProject(id) {
    return http.postQuery('/wfBase/wfGenProject/getWfGenProject', { id })
  }

  /**
   * @description 增加
   * @returns
   */
  static async insertWfGenProject(params) {
    return http.post('/wfBase/wfGenProject/insertWfGenProject', params)
  }

  /**
   * @description 增加(批量)
   * @returns
   */
  static async insertWfGenProjectBatch(wfGenProjectList) {
    return http.post('/wfBase/wfGenProject/insertWfGenProjectBatch', wfGenProjectList)
  }

  /**
   * @description 查询列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async queryWfGenProject(queryCondition) {
    return http.post('/wfBase/wfGenProject/queryWfGenProject', queryCondition)
  }

  /**
   * @description 保存
   * @returns
   */
  static async saveWfGenProject(wfGenProjectDTO) {
    return http.post('/wfBase/wfGenProject/saveWfGenProject', wfGenProjectDTO)
  }

  /**
   * @description 修改
   * @returns
   */
  static async updateWfGenProject(params) {
    return http.post('/wfBase/wfGenProject/updateWfGenProject', params)
  }

}
