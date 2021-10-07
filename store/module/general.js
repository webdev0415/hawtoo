
const state = () => ({
    isNewUser: true,
    editProfileModal: {
        open: false,
    },
    loginModal: {
        open: false,
        title: '',
        description: ''
    },
    watchlistModal: {
        open: false,
        saveMode: false,
        title: 'My Collecions'
    },
});

const getters = {
    isNewUser: (state) => {
        return state.isNewUser
    },
    watchlistModal: (state) => {
        return state.watchlistModal
    },
    loginModal: (state) => {
        return state.loginModal
    },
    editProfileModal: (state) => {
        return state.editProfileModal
    },
};

const mutations = {
    TOGGLE_EDIT_PROFILE_MODAL(state, data) {
        state.editProfileModal = data;
    },
    TOGGLE_LOGIN_MODAL(state, data) {
        state.loginModal = data;
    },
    TOGGLE_WATCHLIST_MODAL(state, data) {
        state.watchlistModal = data;
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