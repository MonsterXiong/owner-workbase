
const ObjectKeyList = ['baseSatelliteMapTileData', 'baseOlMapTileData']

// 如果key有前缀VUE_APP_,则去掉该前缀,并将key转换为小驼峰命名
function convertToCamelCase(obj) {
  const result = {}
  const PREFIX = 'vue_app_'
  for (const key in obj) {
    let newKey = key.toLowerCase()
    newKey = newKey.replace(PREFIX, '').replace(/_([a-zA-z])/g, (_, letter) => letter.toUpperCase())
    if (ObjectKeyList.includes(newKey)) {
      result[newKey] = obj[key] ? JSON.parse(obj[key]) : null
    } else {
      result[newKey] = obj[key]
    }
  }
  // 因为process.env本身就内置了一个BASE_URL:""，所以单独处理一下
  result['baseUrl'] = process.env.VUE_APP_BASE_URL

  return result
}
const configData = convertToCamelCase(process.env)

function loadConfigData() {
  const buildEnv = process.env.VUE_APP_BUILD_ENV
  if (buildEnv) {
    const envArr = buildEnv.split('_')
    //为prod模式，读取static数据
    if (envArr && envArr.length > 0 && envArr[0] === 'prod') {
      // eslint-disable-next-line no-undef
      if (typeof externalConfig != 'undefined') {
        // eslint-disable-next-line no-undef
        const config = externalConfig
        for (let key in configData) {
          if (key === 'baseUrl' && typeof config[key] == 'undefined') {
            configData[key] = '/'
          } else if (typeof config[key] != 'undefined') {
            configData[key] = config[key]
          }
        }
      }
    }
  }
  return configData
}

export default loadConfigData()
