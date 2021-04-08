import { getUserInfo, logout } from '@/api/user'
import { MessageBox } from 'element-ui'
const userStore = {
  state: {
    userTokenInfo: {},
    meneArr: [],
    userInfo: {},
    myUser: '',
    myPhoto: ''
  },
  getters: {
    myUser: state => state.myUser,
    myPhoto: state => state.myPhoto
  },
  mutations: {
    SET_USERTOKENINFO: (state, value) => {
      state.userTokenInfo = value
    },
    SET_MENUINFO: (state, value) => {
      state.userTokenInfo = value
    },
    SET_USERINFO: (state, value) => {
      state.userTokenInfo = value
    },
    SET_MY_USER: (state, value) => {
      state.myUser = value
    },
    SET_MY_PHOTO: (state, value) => {
      state.myPhoto = value
    }
  },
  actions: {
    // 登出方法
    logout: () => {
      MessageBox.confirm('确定退出吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const str = 'access_token=' + localStorage.getItem('token')
        logout(str).then(() => {
          localStorage.removeItem('token')
          // localStorage.removeItem('baseUrl')
          localStorage.removeItem('userInfo')
          // 删除菜单相关的数据
          localStorage.removeItem('tabList')
          localStorage.removeItem('onOpenTabId')
          localStorage.removeItem('onOpenMenuIndex')
          sessionStorage.removeItem('vuex')
          location.reload()
        })
      }).catch(() => {
      })
    },
    saveUserTokenInfo: ({ commit }, value) => {
      localStorage.setItem('token', value.access_token)
      return new Promise((resolve, reject) => {
        const params = {
          access_token: value.access_token
        }
        getUserInfo(params).then((res) => {
          if (res.code === '0') {
            commit('SET_USERINFO', res.permissions)
            localStorage.setItem('userInfo', JSON.stringify(res.user))
            commit('SET_MY_USER', res.user.nickname)
            commit('SET_MY_PHOTO', res.user.headImgUrl)
            commit('SET_MENUINFO', res.user)
            commit('SET_USERTOKENINFO', value)
            resolve()
          } else {
            reject(new Error('返回用户信息报错'))
          }
        })
      })
    }
  }
}

export default userStore
