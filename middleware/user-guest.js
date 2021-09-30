export default async function ({ $auth, route, redirect }) {
    const isLoggedIn = await $auth.loggedIn

    if (isLoggedIn) {
        const REDIRECT_URL = '/';
        redirect(REDIRECT_URL)
    }
}