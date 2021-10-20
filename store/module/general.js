
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
    searchModal: {
        open: false,
    },
    watchlistModal: {
        open: false,
        saveMode: false,
        title: 'My Collecions'
    },
    referralModal: {
        open: false,
        intent: '',
    },
});

const getters = {
    isNewUser: (state) => {
        return state.isNewUser
    },
    watchlistModal: (state) => {
        return state.watchlistModal
    },
    referralModal: (state) => {
        return state.referralModal
    },
    searchModal: (state) => {
        return state.searchModal
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
    TOGGLE_REFERRAL_MODAL(state, data) {
        state.referralModal = data;
    },
    TOGGLE_SEARCH_MODAL(state, data) {
        state.searchModal = data;
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