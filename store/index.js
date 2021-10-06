// import Vuex from 'vuex';
import general from './module/general'
import watchlists from './module/watchlists'

export default {
    strict: false,
    modules: { watchlists, general },
    state() {
        return {};
    },
    actions: {},
    mutatations: {},
    getters: {}
}