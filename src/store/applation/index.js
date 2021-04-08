const applation = {
  state: {
    isEditApplation: false, // 是否是修改应用表示
    editId: '',
    clientId: '',
    ablityId: '',
    addAblityList: '', // 订阅能力列表
    stateParam: '',
    sandBoxState: ''  // 是否是沙箱
  },
  getters: {
    isEditApplation: state => state.isEditApplation,
    editId: state => state.editId,
    clientId: state => state.clientId,
    ablityId: state => state.ablityId,
    addAblityList: state => state.addAblityList,
    stateParam: state => state.stateParam,
    sandBoxState: state => state.sandBoxState
  },
  mutations: {
    SET_IS_EDIT: (state, value) => {
      state.isEditApplation = value
    },
    SET_EDIT_ID: (state, value) => {
      state.editId = value
    },
    SET_CLENT_ID: (state, value) => {
      state.clientId = value
    },
    SET_ABLITY_ID: (state, value) => {
      state.ablityId = value
    },
    ADD_ABLITY_LIST: (state, value) => {
      state.addAblityList = value
    },
    SET_ATATE_PARAM: (state, value) => {
      state.stateParam = value
    },
    SET_SAND_PATH: (state, value) => {
      state.sandBoxState = value
    }
  },
  actions: {
    getIsEdit: ({ commit }, value) => {
      commit('SET_IS_EDIT', value)
    },
    getEditId: ({ commit }, value) => {
      commit('SET_EDIT_ID', value)
    },
    getClientId: ({ commit }, value) => {
      commit('SET_CLENT_ID', value)
    },
    getAblityId: ({ commit }, value) => {
      commit('SET_ABLITY_ID', value)
    },
    getAddAblityList: ({ commit }, value) => {
      commit('ADD_ABLITY_LIST', value)
    },
    getStateParam: ({ commit }, value) => {
      commit('SET_ATATE_PARAM', value)
    },
    getSandBox: ({ commit }, value) => {
      commit('SET_SAND_PATH', value)
    }
  }
}

export default applation
