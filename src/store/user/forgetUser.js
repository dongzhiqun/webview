const forgerStore = {
  state: {
    progessNum: 'one',
    progessInfo: {}
  },
  getters: {
    progessNum: state => state.progessNum,
    progessInfo: state => state.progessInfo
  },
  mutations: {
    SET_PROGESS_NUM: (state, value) => {
      state.progessNum = value
    },
    SET_PROGESS_INFO: (state, value) => {
      state.progessInfo = value
    }
  },
  actions: {
    getProgessNum: ({ commit }, value) => {
      commit('SET_PROGESS_NUM', value)
    },
    getProgessInfo: ({ commit }, value) => {
      commit('SET_PROGESS_INFO', value)
    }
  }
}

export default forgerStore
