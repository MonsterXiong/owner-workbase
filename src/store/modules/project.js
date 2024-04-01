import { getGenerateJson } from '@/services/otherSystem.js'
import { SfProjectExtendService } from '@/services'
import tools from '../../plugins/globalMethods/tools/tool'

export const ProjectMutations = {
    SYNC_PROJECT:'sync_project'
}

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    [ProjectMutations.SYNC_PROJECT]: async (store,projectId) => {
        if (!projectId) {
            return tools.message('请先选择项目',{type:'warning'})
          }
        const { data:jsonData } = await getGenerateJson(projectId)
        if (jsonData) {
            await SfProjectExtendService.syncProjectToSf(projectId, jsonData)
            tools.message('同步成功')
        }
    }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
