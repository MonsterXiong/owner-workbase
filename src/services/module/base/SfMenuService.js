import { service } from '@/services/http'

/**
 * 关于菜单的服务
 */
export default class SfMenuService {
  /**
   * @description 删除菜单(批量、递归)
   * @returns
   */
  static async deleteSfMenuBatch(menuIdList) {
    return service.post('/sfBase/sfMenu/deleteSfMenuBatch', menuIdList)
  }

  /**
   * @description 导入菜单模板下载
   * @returns
   */
  static async downloadSfMenuTemplate() {
    return service.postFormData('/sfBase/sfMenu/downloadSfMenuTemplate', {})
  }

  /**
   * @description 导出菜单
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async exportSfMenu(queryCondition) {
    return service.post('/sfBase/sfMenu/exportSfMenu', queryCondition, {
      responseType: 'blob',
    })
  }

  /**
   * @description 获取菜单
   * @param {String} menuId 菜单主键
   * @returns
   */
  static async getSfMenu(menuId) {
    return service.postQuery('/sfBase/sfMenu/getSfMenu', { menuId })
  }

  /**
   * @description 导入菜单
   * @param {File} file 文件对象
   * @returns
   */
  static async importSfMenu(file) {
    return service.postForm('/sfBase/sfMenu/importSfMenu', { file })
  }

  /**
   * @description 增加菜单
   * @returns
   */
  static async insertSfMenu(params) {
    return service.post('/sfBase/sfMenu/insertSfMenu', params)
  }

  /**
   * @description 增加菜单(批量)
   * @returns
   */
  static async insertSfMenuBatch(sfMenuList) {
    return service.post('/sfBase/sfMenu/insertSfMenuBatch', sfMenuList)
  }

  /**
   * @description 查询菜单列表结果
   * @param {Object} queryCondition 查询条件
   * @returns
   */
  static async querySfMenu(queryCondition) {
    return service.post('/sfBase/sfMenu/querySfMenu', queryCondition)
  }

  /**
   * @description 保存菜单
   * @returns
   */
  static async saveSfMenu(sfMenuDTO) {
    return service.post('/sfBase/sfMenu/saveSfMenu', sfMenuDTO)
  }

  /**
   * @description 保存菜单(批量)
   * @returns
   */
  static async saveSfMenuBatch(params) {
    return service.post('/sfBase/sfMenu/saveSfMenuBatch', params)
  }

  /**
   * @description 修改菜单
   * @returns
   */
  static async updateSfMenu(params) {
    return service.post('/sfBase/sfMenu/updateSfMenu', params)
  }

  /**
   * @description 修改菜单(批量)
   * @returns
   */
  static async updateSfMenuBatch(sfMenuList) {
    return service.post('/sfBase/sfMenu/updateSfMenuBatch', sfMenuList)
  }
}
