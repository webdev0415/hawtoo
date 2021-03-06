export default function ({ route, store, redirect }) {
    const isLoggedIn = store.state.auth.loggedIn

    if (!isLoggedIn) {
        /**
         * If the user visited a page that requires authentication.
         * This will pass a query string redirect URL that we can pick up
         * on the login form which will be passed to Supabase.
         */
        // if (route.path !== '/connect') {
        //     const REDIRECT_URL = '/connect?redirect=' + route.path
        //     redirect(REDIRECT_URL)
        // }
        if (route.path !== '/connect') {
            store.commit('general/TOGGLE_LOGIN_MODAL', {
                open: true,
                title: 'Log in or sign up',
                description: 'To save crypto projects to watchlists',
                referrer: route.path
            })
            redirect({ path: '/' })
        }
    }
}