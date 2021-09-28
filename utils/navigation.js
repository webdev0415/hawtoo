export const navigation = [
    {
        name: 'Home',
        text: 'For Investors',
        path: '/'
    },
    {
        name: 'Admins',
        text: 'For Owners',
        path: '/admins'
    },
    {
        name: 'Admins',
        text: 'My Watchlist',
        path: '/account/watchlist',
        auth: true
    }
]

export const mobileNavigation = [
    {
        name: 'Home',
        text: 'Home',
        path: '/'
    },
    {
        name: 'Popular',
        text: 'Popular',
        path: '/popular'
    },
    {
        name: 'SubmitProject',
        text: 'Submit a project',
        path: '/account/submit-project'
    },
    {
        name: 'Signup',
        text: 'Signup',
        path: '/signup'
    },
    {
        name: 'Login',
        text: 'Login',
        path: '/login'
    }
]

export const userMenuNavigation = [
    { name: 'Your Profile', path: '/account/watchlist' },
    { name: 'Submit A Project', path: '/submit-project' }
]

export const footerNavigation = [
    { name: 'For Investors', path: '/' },
    { name: 'For Owners', path: '/popular' },
    { name: 'Login', path: '/login' }
]
