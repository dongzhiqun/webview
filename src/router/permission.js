/* eslint-disable*/
import router from './index'
import NProgress from 'nprogress'
import store from '@/store/index'
import Layout from '@/views/layout/layout'
import _import from './_import_'
import axios from 'axios'
let newR = []
const whitList = ['/', '/login', '/regUser', '/regSuccess', '/forgetPass/forgetPassOne', '/forgetPass/forgetPassTwo', '/forgetPass/resertPass', '/forgetPass/resertSuccess']
router.beforeEach((to, from, next) => {
  // if (to.path === from.path) {
  //   next()
  //   return
  // }
  NProgress.start()
  // if (whitList.indexOf(to.path) < 0 && localStorage.getItem('canGo') !== null) {
  //   localStorage.removeItem('canGo')
  // }
  // if (localStorage.getItem('baseUrl') === null && process.env.NODE_ENV === 'production') {
  //   axios.get('/address').then(res => {
  //     store.commit('ADD_BASE_URL', res.data.substring(0, res.data.length - 1))
  //     localStorage.setItem('baseUrl', res.data.substring(0, res.data.length - 1))
  //     if (localStorage.getItem('token')) {
  //       if (whitList.indexOf(to.path) > -1) {
  //         NProgress.done()
  //         next()
  //       } else {
  //         NProgress.done()
  //       }
  //     } else {
  //       if (whitList.indexOf(to.path) > -1) {
  //         NProgress.done()
  //         next()
    NProgress.done()
    next()
  
  //     }
  //   })
  // } else {
  //   if (localStorage.getItem('token')) {
  //     if (whitList.indexOf(to.path) > -1) {
  //       NProgress.done()
  //       next()
  //     } else {
  //       if (newR.length === 0) {
  //         store.dispatch('addRouter').then(res => {
  //           newR = resetRouter(res)
  //           router.addRoutes(newR)
  //           router.options.routes = newR
  //         })
  //       }
  //       NProgress.done()
  //       next()
  //     }
  //   } else {
  //     if (whitList.indexOf(to.path) > -1) {
  //       NProgress.done()
  //       next()
  //     } else {
  //       NProgress.done()
  //       next()
  //       next('/login')
  //     }
  //   }
  // }
})
// 拼接路由方法
const keepAliveArr = ['documentInit', 'ablitySubAdd', 'applationDetail']
function resetRouter (arr) {
  const routerArr = []
  arr.forEach(item => {
    const obj = {
      path: item.url,
      name: item.name,
      component: item.parentId === '-1' ? Layout : _import(item.path),
      show: !item.hidden,
      meta: {
        title: item.name,
        icon: item.css || null,
        keepAlive: keepAliveArr.indexOf(item.url) >= 0 ? 'true' : 'false'
      }
    }
    if (item.subMenus !== null && item.subMenus.length > 0) {
      obj.children = resetRouter(item.subMenus)
    }
    routerArr.push(obj)
  })
  return routerArr
}
