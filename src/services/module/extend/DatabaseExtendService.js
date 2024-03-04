import { service } from '../../http'

export default class GenExtendService {
  static async getDatabaseData(params) {
    return service.post('/database/getDatabaseData', params)
  }
  static async getFieldData(database, tableName) {
    return service.get(`/database/${database}/${tableName}`)
  }
}
