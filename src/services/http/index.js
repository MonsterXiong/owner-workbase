import axios from 'axios'
import qs from 'qs'
const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const axiosConfig = {
  baseURL: 'http://192.168.2.190:3000',
  // baseURL: 'http://localhost:3000',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
}

class Service {
  constructor() {
    this.instance = axios.create(axiosConfig)
    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  get(url, params, config) {
    return this.instance.get(url, Object.assign({ params }, config))
  }

  post(url, data, config) {
    return this.instance.post(url, data, config)
  }

  postFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        if (data[k] instanceof Object) {
          Object.keys(data[k]).forEach((key) => {
            if (data[k] !== undefined && data[k] !== null) {
              formData.append(`${k}.${key}`, data[k][key])
            }
          })
        } else {
          formData.append(k, data[k])
        }
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postFormDataFile(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        formData.append(k, data[k])
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postFormDataWithObject(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      const value = data[key]
      if (Array.isArray(value)) {
        value.forEach((arrayItem, index) => {
          if (isObject(arrayItem)) {
            Object.keys(arrayItem).forEach((innerKey) => {
              if (arrayItem[innerKey] != undefined && arrayItem[innerKey] != null) {
                formData.append(`${key}[${index}].${innerKey}`, arrayItem[innerKey])
              }
            })
          }
        })
      } else {
        formData.append(key, value)
      }
    })

    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postForm(url, form, config) {
    return this.post(
      url,
      form,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  plainPostFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      formData.append(k, data[k])
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postQuery(url, params, config) {
    return this.instance.post(url + '?' + qs.stringify(params), undefined, config)
  }

  postQueryToBlob(url, params, config) {
    return this.instance.post(
      url + '?' + qs.stringify(params),
      undefined,
      Object.assign({}, config, {
        responseType: 'blob',
      })
    )
  }

  deleteQuery(url, params, config) {
    return this.instance.delete(url + '?' + qs.stringify(params), config)
  }

  postXmlFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        formData.append(k, data[k])
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }
}

export const service = new Service()
