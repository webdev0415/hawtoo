export default async function ({ $auth, redirect }) {
    const user = await $auth.loggedIn
    console.log('Is user logged in?');
    console.log(user);
    // eslint-disable-next-line no-unused-vars
    // const userCookie = await app.$cookies.get('auth._token.local')
    if (user) {
        // let the user see the page
    } else {
        // redirect to homepage
        redirect('/')
    }
}