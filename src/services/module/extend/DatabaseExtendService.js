import { service } from '../../http'

export default class DatabaseExtendService {
  static async getDatabaseData(params) {
    return service.post('/database/getDatabaseData', params)
  }
  static async getFieldData(database, tableName) {
    return service.get(`/database/${database}/${tableName}`)
  }
}
