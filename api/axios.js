// axios 全局拦截
var axios = require('axios')
var urlName = require('./urlName')
var env = require('./env')
var { stringFormat } = require('../public/javascripts/utils/serverTools')
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
    console.log(error.response)
    if (error.response.data.success == false) {
      error.message = error.response.data.error_msg
    }
    return Promise.reject({
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data.error_msg,
      success: error.response.data.success
    })
  }
)

module.exports = {
    post(url, data, other = {}) {
      var newUrl = urlName[url]
      Object.keys(data).forEach(key => {
        newUrl = stringFormat(newUrl, data[key])
      })
      return service({
        url: newUrl,
        method: 'post',
        data,
        headers: other.headers ? other.headers : {}
      })
    },
    get(url, params, other = {}) {
      var newUrl = urlName[url]
      Object.keys(params).forEach(key => {
        newUrl = stringFormat(newUrl, params[key])
      })
      return service({
        url: newUrl,
        method: 'get',
        params,
        headers: other.headers ? other.headers : {}
      })
    }
  }
