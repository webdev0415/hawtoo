
export const strict = false;

export const state = () => ({
    isNewUser: true,
    setFeaturedProjects: [],
    loginModal: {
        open: false,
        title: '',
        description: ''
    },
    header: {
        hideNav: false,
    }
});

export const getters = () => ({
    isNewUser: (state) => {
        return state.isNewUser
    }
});

export const mutations = {
    setFixedHeader(state, bool) {
        state.fixedHeader = bool;
    },
    setHeader(state, data) {
        state.header = data;
    },
    setLoginModal(state, data) {
        state.loginModal = data;
    },
    setFeaturedProjects(state, data) {
        state.featuredProjects = state.featuredProjects.concat(data);
    },
    setIsNewUser(state, flag) {
        state.isNewUser = flag
    }
};

export const actions = {
    SET_FIXED_HEADER: ({ commit }, payload) => {
        commit('setFixedHeader', payload)
    },
    SET_LOGIN_MODAL: ({ commit }, payload) => {
        commit('setLoginModal', payload)
    },
    SET_HEADER: ({ commit }, payload) => {
        commit('setHeader', payload)
    },
};