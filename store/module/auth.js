import { getProfileInfo } from '@/utils/supabase/users'

/* --------------------------------
* This store is hydrated on load in: ./plugins/supabase.js
* Auth events/changes are watched for in: ./layouts/default.vue
*
* state.user = Privileged information.
* state.user.profile = Public information.
* ------------------------------- */

const state = () => ({
    loggedIn: false,
    user: {},
})

const getters = {
    loggedIn: (state) => state.loggedIn,
    user: (state) => state.user,
    profile: (state) => state.user.public_profile,
}

const actions = {
    /**
     * Gets hydrated cient/server side in ./plugins/supabase.js.
     * Auth events are watched for in: ./layouts/**.vue
     *
     * @param object user Supabase auth object.
     */
    fetchUser: async ({ state, commit, rootState }, user) => {
        if (user) {
            // console.log('------- Changed received user -------');
            // console.log(user);
            commit('SET_LOGGED_IN', user != null)
            commit('SET_AUTH', user)
            try {
                const { data, error, status } = await getProfileInfo(user.id)
                // console.log('------- Changed received profiles table -------');
                // console.log(data);
                if (error && status !== 406) throw error

                if (data) {
                    commit('SET_PROFILE', data)
                }
            } catch (error) {
                throw new Error(error.message);
            }
        } else {
            commit('SET_AUTH', null)
            commit('SET_LOGGED_IN', false)
        }
    },
}

const mutations = {
    SET_LOGGED_IN: (state, boolean) => {
        state.loggedIn = boolean
    },
    SET_AUTH: (state, user) => {
        state.user = user
    },
    SET_PROFILE: (state, profile) => {
        state.user.public_profile = profile
    },
    SET_DISPLAY_NAME: (state, displayName) => {
        state.user.public_profile.display_name = displayName
        state.user.user_metadata.full_name = displayName
    },
    SET_EMAIL: (state, email) => {
        state.user.email = email
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}