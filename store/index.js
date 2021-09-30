
export const strict = false;

export const state = () => ({
    fixedHeader: false,
    setFeaturedProjects: [],
    loginModal: {
        open: false,
        title: '',
        description: ''
    }
});

export const mutations = {
    setFixedHeader(state, bool) {
        state.fixedHeader = bool;
    },
    setLoginModal(state, data) {
        state.loginModal = data;
    },
    setFeaturedProjects(state, data) {
        state.featuredProjects = state.featuredProjects.concat(data);
    },
};

export const actions = {
    SET_FIXED_HEADER: ({ commit }, payload) => {
        commit('setFixedHeader', payload)
    },
    SET_LOGIN_MODAL: ({ commit }, payload) => {
        commit('setLoginModal', payload)
    },
};