import { supabase } from '@/plugins/supabase'
import { getUserWatchlists } from '@/api/lib/watchlists'

const state = () => ({
    watchlists: [],
    watchlistsSubscriber: {},
})

const getters = {
    watchlists: (state) => state.watchlists,
}

const actions = {
    fetchWatchlists: async ({ state, commit, rootState }, userId) => {

        try {
            const { data, error, status } = await getUserWatchlists(userId)
            if (error && status !== 406) throw error

            if (data) {

                const watchlists = data.map((watchlist) => ({
                    ...watchlist,
                }))

                commit('SET_WATCHLISTS', watchlists)

                supabase
                    .from('watchlists')
                    .on('*', (payload) => {
                        console.log('Change received!', payload)
                        switch (payload.eventType) {
                            case 'INSERT':
                                commit('ADD_WATCHLIST', payload.new)
                                break
                            case 'UPDATE':
                                commit('MODIFY_WATCHLIST', payload.new)
                                return
                            case 'DELETE':
                                commit('DELETE_WATCHLIST', payload.new.id)
                                break
                        }
                    })
                    .subscribe()

                // commit('SET_SUBSCRIBER', subscriber)
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    unsubscribeWatchlist: ({ state }) => {
        supabase.removeSubscription(state.watchlistsSubscriber)
    },
    destroySubscriber: ({ dispatch, commit }) => {
        dispatch('unsubscribeWatchlist')
        commit('RESET_WATCHLISTS')
    },
}

const mutations = {
    SET_WATCHLISTS: (state, watchlists) => {
        state.watchlists = watchlists
    },
    SET_SUBSCRIBER: (state, subscriber) => {
        state.watchlistsSubscriber = subscriber
    },
    RESET_WATCHLISTS: (state, watchlists) => {
        state.watchlists = []
    },
    ADD_WATCHLIST: (state, watchlist) => {
        state.watchlists.push(watchlist)
    },
    MODIFY_WATCHLIST: (state, watchlist,) => {
        const itemFound = state.watchlists.find((item) => {
            return watchlist.id === item.id
        })
        itemFound.collected = watchlist.collected
        itemFound.name = watchlist.name
        itemFound.description = watchlist.description
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}