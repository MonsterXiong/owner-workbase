import { service } from '../../http'

export default class TranslatorExtendService {
  static async getResult(name) {
    return service.postQuery(`/translator/getResult`, {name})
  }
}
