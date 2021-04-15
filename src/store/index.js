/* eslint-disable*/
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import userStore from './user/index'
import forgerStore from './user/forgetUser'
import applation from './applation/index'
import { getDictionaryList } from '@/api/backStage'
import { getUserMenu } from '@/api/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hiddenMenu: false,
    onOpenTabId: '',
    onOpenMenuIndex: '',
    menuStore: null,
    menuTabStore: [],
    dictionaryArr: [], // 数据字典
    routerArr: null,
    baseUrl: null
  },
  mutations: {
    // 添加baseUrl方法
    ADD_BASE_URL: (state, value) => {
      state.baseUrl = value
    },
    // 添加数据字典数据方法
    ADD_DICTIONAYRYARR: (state, value) => {
      state.dictionaryArr = value
    },
    // 显示隐藏菜单栏
    TOGGLEHIDDENMENU: (state) => {
      state.hiddenMenu === false ? state.hiddenMenu = true : state.hiddenMenu = false
    },
    // 添加tab方法
    ADDMENUTAB: (state, value) => {
      state.menuTabStore = JSON.parse(localStorage.getItem('tabList')) || []
      const hasChildren = state.menuTabStore.findIndex(item => {
        return item.resetPath === value.resetPath
      })
      if (hasChildren < 0) {
        state.menuTabStore.push(value)
      }
      state.onOpenTabId = value.resetPath
      localStorage.setItem('tabList', JSON.stringify(state.menuTabStore))
      localStorage.setItem('onOpenTabId', value.resetPath.toString())
      localStorage.setItem('onOpenMenuIndex', value.index)
    },
    // 切换tab方法
    CHANGEMENUTAB: (state, value) => {
      const arrList = JSON.parse(localStorage.getItem('tabList'))
      const onMenuIndex = arrList.filter(item => {
        return item.resetPath === value
      })
      if (onMenuIndex) {
        state.onOpenMenuIndex = onMenuIndex[0].index
        state.onOpenTabId = value
        localStorage.setItem('onOpenTabId', value)
        localStorage.setItem('onOpenMenuIndex', onMenuIndex[0].index)
      }
    },
    // 切换tab
    CHANGESELECT: (state, value) => {
      state.onOpenMenuIndex = '1-3'
    },
    // 删除tab方法
    REMOVEMENUTAB: (state, value) => {
      state.menuTabStore = JSON.parse(localStorage.getItem('tabList')) || []
      if (value !== '/index') {
        const itemIndex = state.menuTabStore.findIndex((item) => {
          return item.resetPath === value
        })
        if (state.menuTabStore.length === 0) {
          state.menuTabStore = JSON.parse(localStorage.getItem('tabList'))
        }
        if (state.menuTabStore.length > 1) {
          state.menuTabStore.splice(itemIndex, 1)
          if (localStorage.getItem('onOpenTabId') === value) {
            const onShowIndex = itemIndex - 1
            state.onOpenMenuIndex = state.menuTabStore[onShowIndex].index
            state.onOpenTabId = state.menuTabStore[onShowIndex].resetPath
            localStorage.setItem('onOpenMenuIndex', state.onOpenMenuIndex)
            localStorage.setItem('onOpenTabId', state.menuTabStore[onShowIndex].resetPath)
          }
        }
        localStorage.setItem('tabList', JSON.stringify(state.menuTabStore))
      }
    },
    // 添加路由
    ADD_ROUTERARR: (state, value) => {
      state.menuStore = value
    }
  },
  actions: {
    // 保存数据字典的方法
    saveDictionaryInfo: ({ commit }, value) => {
      return new Promise((resolve, reject) => {
        const params = {
          access_token: localStorage.getItem('token')
        }
        getDictionaryList(params).then((res) => {
          if (res.code === 0) {
            const tableData = []
            res.data.forEach(item => {
              if (item.parentCode === '-1') {
                tableData.push(item)
              }
            })
            tableData.forEach(item => {
              item.children = []
              res.data.forEach(i => {
                if (item.id === i.parentCode) {
                  item.children.push(i)
                }
              })
            })
            commit('ADD_DICTIONAYRYARR', tableData)
            localStorage.setItem('dictionaryArr', JSON.stringify(tableData))
            resolve()
          } else {
            reject(new Error('返回数字典信息报错'))
          }
        })
      })
    },
    addRouter: ({ commit }, value) => {
      return new Promise((resolve, reject) => {
        const params = {
          access_token: localStorage.getItem('token')
        }
        // getUserMenu(params).then((res) => {
        // resolve(res)
        // }).catch(res => {
        //   reject(res)
        // })
      })
    }
  },
  modules: {
    userStore,
    forgerStore,
    applation
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
