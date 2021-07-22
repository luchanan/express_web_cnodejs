// 多环境API配置, server
module.exports = {
  local: {
    baseURL: 'https://cnodejs.org/api/v1'
  },
  dev: {
    baseURL: 'http://192.168.3.168'
  },
  sit: {
    baseURL: 'http://192.168.3.172'
  },
  prod: {
    baseURL: 'http://192.168.3.172'
  }
}