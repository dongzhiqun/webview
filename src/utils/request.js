import axios from 'axios'
// import commonUrl from './commonUrl'
import { Message, Loading } from 'element-ui'
let loadingCount = 0
let loading
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: '#ffffff80'
  })
}
const endLoading = () => {
  setTimeout(function () {
    loading.close()
  }, 100)
}
const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}
const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
let apiUrl
if (process.env.NODE_ENV === 'production') {
  apiUrl = localStorage.getItem('baseUrl')
} else {
  apiUrl = process.env.VUE_APP_BASE_URL
  localStorage.setItem('baseUrl', apiUrl)
}
const service = axios.create({
  baseURL: apiUrl,
  timeout: 60 * 1000
})
// 拦截器request
service.interceptors.request.use(
  config => {
    // if (config.baseURL === '' || config.baseURL === null) {
    //   config.baseURL = commonUrl
    //   localStorage.setItem('baseUrl', commonUrl)
    // }
    if (localStorage.getItem('token')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') // 这个写法eslint报错
    }
    // config.headers['Content-Type'] = 'application/json; charset=UTF-8'
    if (config.method.toLocaleLowerCase() !== 'get') {
      if (config.params === undefined) {
        config.data = {}
      } else {
        const _data = JSON.parse(JSON.stringify(config.params))
        config.data = _data
        config.params = null
      }
    }
    showLoading()
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response
    hideLoading()
    if (res.status !== 200) {
      return Promise.reject(new Error(res))
    } else {
      return res.data
    }
  },
  error => {
    console.log(error)
    hideLoading()
    if (error.response.status === 401) {
      Message({
        showClose: true,
        message: '暂无权限，请重新登录！',
        type: 'error'
      })
      localStorage.removeItem('token')
      localStorage.removeItem('baseUrl')
      location.reload()
    } else if (error.response.status === 400) {
      Message({
        showClose: true,
        message: error.response.data.msg,
        type: 'error'
      })
    } else {
      Message({
        showClose: true,
        message: error.message,
        type: 'error'
      })
    }
  }
)
export default service
