import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('此时，一位靓仔路过')
  let token = localStorage.getItem('back_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
