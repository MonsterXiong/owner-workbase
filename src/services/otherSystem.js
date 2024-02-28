import axios from 'axios'

const baseURL = 'http://192.168.2.204:8037'

const instance = axios.create({
  baseURL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async (config) => {
    const formData = new FormData()
    formData.append('account', 'admin')
    formData.append('password', '123456')
    const { data } = await axios.post(`${baseURL}/user/login`, formData)
    if (data?.data?.token) {
      config.headers.token = data.data.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 获取代码生成数据
export function getGenerateJson(projectId) {
  return instance.post(`/business/extOperate/generateData?projectId=${projectId}`)
}

// 查询项目列表结果
export function getProjectList() {
  return instance.post(`/sfBase/sfProject/querySfProject`,{
    pageNumber:'1',
    pageSize:99999
  })
}

