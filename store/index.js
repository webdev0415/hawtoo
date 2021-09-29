
export const strict = false;

export const state = () => ({
    fixedHeader: false,
    setFeaturedProjects: [],
});

export const mutations = {
    setFixedHeader(state, bool) {
        state.fixedHeader = bool;
    },
    setFeaturedProjects(state, data) {
        state.featuredProjects = state.featuredProjects.concat(data);
    },
};

export const actions = {
    SET_FIXED_HEADER: ({ commit }, payLoad) => {
        commit('setFixedHeader', payLoad)
    },
};