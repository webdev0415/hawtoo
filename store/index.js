import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import user from './modules/store-user';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// initial state
const initialState = {
    user: user.state,
}
// export const plugins = [createPersistedState]

export default function (/* { ssrContext } */) {
    return new Vuex.Store({
        modules: {
            user,
        },
        state: {
            is_project_exist: null
        },
        // This plugin is important to keep the store in localstorage/cookies on page refreshes.
        strict: process.env.DEBUGGING,
        mutations: {
            reset(state) {
                Object.keys(state).forEach(key => {
                    if (key !== 'user') {
                        // eslint-disable-next-line no-console
                        console.log('Resetting state: ' + key);
                        Object.assign(state[key], initialState[key])
                    }
                })
            }
        }
    })

}
