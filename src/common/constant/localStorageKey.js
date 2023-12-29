const localstorgeKeyPrefix = 'xqfxxt_'

const LocalStorageKey = Object.freeze({
  TOKEN: localstorgeKeyPrefix + 'token',
  USER_INFO: localstorgeKeyPrefix + 'userInfo',
  PROJECT_ID: localstorgeKeyPrefix + 'projectId',
  PROJECT: localstorgeKeyPrefix + 'project',
  NEW_AUTO_OPEN: localstorgeKeyPrefix + 'new_auto_open', // 新增项目时是否自动打开
})
