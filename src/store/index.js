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
        const res = [{ "id": "2354645758768997897", "parentId": "-1", "name": "数据概览", "platformFlag": "", "url": "/viewModel", "path": "/viewModel", "css": "el-icon-data-line", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": [{ "id": "1423536476558788765", "parentId": "2354645758768997897", "name": "数据概览", "platformFlag": "", "url": "viewModel", "path": "/viewModel/viewModel", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }], "menuIds": "" }, { "id": "1325990389042008071", "parentId": "-1", "name": "个人中心", "platformFlag": "", "url": "/personCenter", "path": "/personCenter", "css": "el-icon-user", "sort": 1, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": [{ "id": "1235398089457573575", "parentId": "1325990389042008071", "name": "基本信息", "platformFlag": "", "url": "userInfo", "path": "/personCenter/userInfo", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1235398089457573577", "parentId": "1325990389042008071", "name": "基本信息编辑", "platformFlag": "", "url": "editInfo", "path": "/personCenter/editInfo", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1235398089457573576", "parentId": "1325990389042008071", "name": "安全设置", "platformFlag": "", "url": "secSetting", "path": "/personCenter/secSetting", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008073", "parentId": "1325990389042008071", "name": "实名认证", "platformFlag": "", "url": "realeName", "path": "/personCenter/realeName", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1235398089457573578", "parentId": "1325990389042008071", "name": "密码修改", "platformFlag": "", "url": "secSetingPass", "path": "/personCenter/secSetingPass", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1235398089457573579", "parentId": "1325990389042008071", "name": "绑定手机修改", "platformFlag": "", "url": "secSetingPhone", "path": "/personCenter/secSetingPhone", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }], "menuIds": "" }, { "id": "1378418769387325875", "parentId": "-1", "name": "应用管理", "platformFlag": "", "url": "/applation", "path": "/applation", "css": "el-icon-files", "sort": 2, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": [{ "id": "1347945623678434613", "parentId": "1378418769387325875", "name": "应用列表", "platformFlag": "", "url": "applationList", "path": "/applation/applation", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325989845674119170", "parentId": "1378418769387325875", "name": "应用创建", "platformFlag": "", "url": "creatApplation", "path": "/applation/creatApplation", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008068", "parentId": "1378418769387325875", "name": "应用详情", "platformFlag": "", "url": "applationDetail", "path": "/applation/applationDetail", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008066", "parentId": "1378418769387325875", "name": "添加能力", "platformFlag": "", "url": "ablitySubAdd", "path": "/applation/ablitySubAdd", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008070", "parentId": "1378418769387325875", "name": "能力订阅结果列表", "platformFlag": "", "url": "statusApplation", "path": "/applation/statusApplation", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008069", "parentId": "1378418769387325875", "name": "能力详情", "platformFlag": "", "url": "ablityDetail", "path": "/applation/ablityDetail", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008065", "parentId": "1378418769387325875", "name": "订阅列表", "platformFlag": "", "url": "ablitySub", "path": "/applation/ablitySub", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }], "menuIds": "" }, { "id": "1325990389042008067", "parentId": "-1", "name": "沙箱环境", "platformFlag": "", "url": "/sandBox", "path": "/sandBox", "css": "el-icon-bangzhu", "sort": 3, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": [{ "id": "1325990389042008121", "parentId": "1325990389042008067", "name": "实名认证", "platformFlag": "", "url": "realeName", "path": "/sandBox/realeName", "css": "", "sort": 0, "isMenu": 2, "hidden": true, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }, { "id": "1325990389042008072", "parentId": "1325990389042008067", "name": "测试应用", "platformFlag": "", "url": "sandBox", "path": "/sandBox/index", "css": "", "sort": 0, "isMenu": 2, "hidden": false, "createTime": "2021-02-22 09:20:38", "updateTime": "2021-02-22 09:20:38", "deleteFlag": "", "subMenus": "", "menuIds": "" }], "menuIds": "" }]
        resolve(res)
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
