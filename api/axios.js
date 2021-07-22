// axios 全局拦截
var axios = require('axios')
var urlName = require('./urlName')
var env = require('./env')
const service = axios.create({
  baseURL: `${env[process.env.ENV].baseURL}/`,
  timeout: 30000
})
service.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
service.interceptors.response.use(
  response => {
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = {
    post(url, data, other = {}) {
      return service({
        url: urlName[url],
        method: 'post',
        data,
        headers: other.headers ? other.headers : {}
      })
    },
    get(url, params, other = {}) {
      return service({
        url: urlName[url],
        method: 'get',
        params,
        headers: other.headers ? other.headers : {}
      })
    }
  }
