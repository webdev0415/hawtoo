
const state = () => ({
    isNewUser: true,
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
});

const getters = {
    isNewUser: (state) => {
        return state.isNewUser
    },
    collectionModal: (state) => {
        return state.collectionModal
    },
    loginModal: (state) => {
        return state.loginModal
    },
};

const mutations = {
    TOGGLE_LOGIN_MODAL(state, data) {
        state.loginModal = data;
    },
    TOGGLE_COLLECTION_MODAL(state, data) {
        state.collectionModal = data;
    },
    SET_NEW_USER(state, flag) {
        state.isNewUser = flag
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}