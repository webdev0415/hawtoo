// import Vuex from 'vuex';
import general from './module/general'
import collections from './module/collections'

export default {
    strict: false,
    modules: { collections, general },
    state: () => ({
        isNewUser: true,
        setFeaturedProjects: [],
        loginModal: {
            open: false,
            title: '',
            description: ''
        },
        header: {
            hideNav: false,
        }
    })
}