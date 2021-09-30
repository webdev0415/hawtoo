export default async function ({ $auth, route, redirect }) {
    const isLoggedIn = await $auth.loggedIn

    if (!isLoggedIn) {
        /**
         * If the user visited a page that requires authentication.
         * This will pass a query string redirect URL that we can pick up
         * on the login form which will be passed to Supabase.
         */
        if (route.path !== '/connect') {
            const REDIRECT_URL = '/connect?redirect=' + route.path
            redirect(REDIRECT_URL)
        }
    }
}