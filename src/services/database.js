import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance

export function getDatabaseData(params) {
  return instance.post('/database/getDatabaseData', params)
}
export function getFieldData(database, tableName) {
  return instance.get(`/database/${database}/${tableName}`)
}

export function genProject(params) {
  return instance.post(`/gen/genProject`, params, {
    responseType: 'blob',
  })
}

export function genAdapter(params) {
  return instance.post(`/gen-tool/quickGenAdapter`, params)
}
