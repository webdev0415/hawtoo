// import Vuex from 'vuex';
import auth from './module/auth'
import general from './module/general'
import watchlists from './module/watchlists'

export default {
    strict: false,
    modules: { watchlists, general, auth },
    state() {
        return {};
    },
    actions: {},
    mutatations: {},
    getters: {}
}