
const state = () => ({
    isNewUser: true,
    setFeaturedProjects: [],
    loginModal: {
        open: false,
        title: '',
        description: ''
    },
    collectionModal: {
        open: false,
        saveMode: false,
        title: 'My Collecions'
    },
    header: {
        hideNav: false,
    }
});

const actions = {
    toggleCollectionModal: ({ dispatch, commit }, payload) => {
        commit('SET_COLLECTION_MODAL', payload)
    },
}

const getters = {
    isNewUser: (state) => {
        return state.isNewUser
    },
    collectionModal: (state) => {
        return state.collectionModal
    },
};

const mutations = {
    SET_FIXED_HEADER(state, bool) {
        state.fixedHeader = bool;
    },
    setHeader(state, data) {
        state.header = data;
    },
    SET_LOGIN_MODAL(state, data) {
        state.loginModal = data;
    },
    SET_COLLECTION_MODAL(state, data) {
        state.collectionModal = data;
    },
    setFeaturedProjects(state, data) {
        state.featuredProjects = state.featuredProjects.concat(data);
    },
    setIsNewUser(state, flag) {
        state.isNewUser = flag
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}