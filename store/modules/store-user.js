const state = {
  test: null,
  isNewUser: true,
};

const getters = {
  test: (state) => {
    return state.test
  },
  isNewUser: (state) => {
    return state.isNewUser
  }
};

const actions = {};

const mutations = {
  setIsNewUser(state, flag) {
    state.isNewUser = flag
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};