export default function ({ route, store, redirect }) {
    const isLoggedIn = store.state.auth.loggedIn

    if (isLoggedIn) {
        const REDIRECT_URL = '/';
        redirect(REDIRECT_URL)
    }
}