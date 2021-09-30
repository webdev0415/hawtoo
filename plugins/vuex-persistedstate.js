import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

/**
 * SSR implementation for `vuex-persistatedstate`.
 * @see https://github.com/robinvdvleuten/vuex-persistedstate/issues/151#issuecomment-474933996
 * @see https://www.notion.so/Vuex-Persisted-State-SSR-8104650d531f4941a3638c7ef948c711
 */
export default ({ store, isDev, req }) => {
    createPersistedState({
        key: 'hawtooState',
        // Only keep these modules in persistated state.
        // We don't have to keep everything persisted.
        paths: ['auth', 'isNewUser'],
        storage: {
            getItem: (key) => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
            setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
            removeItem: (key) => Cookies.remove(key)
        }
    })(store)
}