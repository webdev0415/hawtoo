import { supabase } from '@/plugins/supabase'
import { getWatchlistsByUserId, getWatchlistById } from '@/utils/supabase/watchlists'

const state = () => ({
    watchlists: [],
    watchlistsSubscriber: {},
    watchlist: [],
    watchlistSubscriber: []
})

const getters = {
    watchlists: (state) => state.watchlists,
    watchlist: (state) => state.watchlist,
}

const actions = {
    fetchSingleWatchList: async ({ state, commit, rootState }, id) => {
        try {

            const { data, error, status } = await getWatchlistById(id)

            if (error && status !== 406) throw error

            if (data) {

                commit('SET_SINGLE_WATCHLIST', data)

                supabase
                    .from(`watchlists:id=eq.${id}`)
                    .on('*', (payload) => {
                        // console.log('Change received for single watchlist: ' + payload.eventType);
                        switch (payload.eventType) {
                            case 'INSERT':
                                commit('SET_SINGLE_WATCHLIST', payload.new)
                                break
                            case 'UPDATE':
                                commit('SET_SINGLE_WATCHLIST', payload.new)
                                return
                            case 'DELETE':
                                commit('SET_SINGLE_WATCHLIST', payload.new.id)
                                break
                        }
                    })
                    .subscribe()

            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    unsubscribeSingleWatchlist: ({ state }) => {
        supabase.removeSubscription(state.watchlistSubscriber)
    },
    destroySingleWatchlistSubscriber: ({ dispatch, commit }) => {
        dispatch('unsubscribeSingleWatchlist')
        commit('RESET_SINGLE_WATCHLIST')
    },
    /**
     * Will only be called for authenticated users. Each user will subscribe to their own changes.
     * @param string userId
     */
    fetchUserWatchlists: async ({ state, commit, rootState }, userId) => {

        try {
            const { data, error, status } = await getWatchlistsByUserId(userId)
            if (error && status !== 406) throw error

            if (data) {

                const watchlists = data.map((watchlist) => ({
                    ...watchlist,
                }))

                commit('SET_WATCHLISTS', watchlists)

                const subscriber = supabase
                    .from(`watchlists:author_id=eq.${userId}`)
                    .on('*', (payload) => {
                        // console.log('Change received: ' + payload.eventType);
                        switch (payload.eventType) {
                            case 'INSERT':
                                commit('ADD_TO_ALL_WATCHLISTS', payload.new)
                                break
                            case 'UPDATE':
                                commit('MODIFY_TO_ALL_WATCHLISTS', payload.new)
                                break
                            case 'DELETE':
                                commit('SET_WATCHLISTS', payload.new)
                                break
                        }
                    })
                    .subscribe()

                commit('SET_WATCHLISTS_SUBSCRIBER', subscriber)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    unsubscribeWatchlists: ({ state }) => {
        supabase.removeSubscription(state.watchlistsSubscriber)
    },
    destroyWatchListsSubscriber: ({ dispatch, commit }) => {
        dispatch('unsubscribeWatchlists')
        commit('RESET_ALL_WATCHLISTS')
    },
}

const mutations = {
    // SINGLE WATCHLIST
    SET_SINGLE_WATCHLIST: (state, watchlist) => {
        state.watchlist = watchlist
    },
    SET_SINGLE_WATCHLIST_SUBSCRIBER: (state, watchlist) => {
        state.watchlistSubscriber = watchlist
    },
    DELETE_SINGLE_WATCHLIST: (state, id) => {
        const index = state.watchlists.findIndex(watchlist => watchlist.id === id);
        state.watchlist.splice(index, 1)
    },
    RESET_SINGLE_WATCHLIST: (state, watchlists) => {
        state.watchlist = []
    },
    // LISTS OF WATCHLISTS
    SET_WATCHLISTS: (state, watchlists) => {
        state.watchlists = watchlists
    },
    SET_WATCHLISTS_SUBSCRIBER: (state, subscriber) => {
        state.watchlistsSubscriber = subscriber
    },
    RESET_ALL_WATCHLISTS: (state, watchlists) => {
        state.watchlists = []
    },
    ADD_TO_ALL_WATCHLISTS: (state, watchlist) => {
        state.watchlists.push(watchlist)
    },
    MODIFY_TO_ALL_WATCHLISTS: (state, watchlist) => {
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