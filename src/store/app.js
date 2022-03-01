export default {
  state: () => ({
    isAppLoaded: false
  }),
  mutations: {
    updateAppLoader(state, newState) {
      state.isAppLoaded = newState
    }
  },
  actions: { 
    appLoaded({ commit }) {
      commit('updateAppLoader', true)
    },
    appNotLoaded({ commit }) {
      commit('updateAppLoader', false)
    }
  },
  getters: {
    loaded(state) {
      return state.isAppLoaded
    }
  }
}