import { supabase } from '@/plugins/supabase'
import { getUserCollections } from '@/api/lib/collections'

const state = () => ({
    collections: [],
    collectionsSubscriber: {},
})

const getters = {
    collections: (state) => state.collections,
}

const actions = {
    fetchCollections: async ({ state, commit, rootState }, userId) => {

        try {
            const { data, error, status } = await getUserCollections(userId)
            if (error && status !== 406) throw error

            if (data) {

                const collections = data.map((collection) => ({
                    ...collection,
                }))

                commit('SET_COLLECTIONS', collections)

                const subscriber = supabase
                    .from('collections')
                    .on('*', (payload) => {
                        console.log('Change received!', payload)
                        switch (payload.eventType) {
                            case 'INSERT':
                                commit('ADD_COLLECTION', payload.new)
                                break
                            case 'UPDATE':
                                commit('MODIFY_COLLECTION', payload.new)
                                return
                            case 'DELETE':
                                commit('DELETE_COLLECTION', payload.new.id)
                                break
                        }
                    })
                    .subscribe()

                commit('SET_SUBSCRIBER', subscriber)
            }
        } catch (error) {
            alert(error.message)
        }
    },
    unsubscribeCollection: ({ state }) => {
        supabase.removeSubscription(state.collectionsSubscriber)
    },
    destroySubscriber: ({ dispatch, commit }) => {
        dispatch('unsubscribeCollection')
        commit('RESET_COLLECTIONS')
    },
}

const mutations = {
    SET_COLLECTIONS: (state, collections) => {
        state.collections = collections
    },
    SET_SUBSCRIBER: (state, subscriber) => {
        state.collectionsSubscriber = subscriber
    },
    RESET_COLLECTIONS: (state, collections) => {
        state.collections = []
    },
    ADD_COLLECTION: (state, collection) => {
        state.collections.push(collection)
    },
    MODIFY_COLLECTION: (state, collection,) => {
        const itemFound = state.collections.find((item) => {
            return collection.id === item.id
        })
        itemFound.collected_projects = collection.collected_projects
        itemFound.collection_name = collection.collection_name
        itemFound.collection_description = collection.collection_description
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}