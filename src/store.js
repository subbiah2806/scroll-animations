import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
  },
  getters: {
    getLoading: state => {
      return state.loading;
    }
  },
  mutations: {
    LOADING: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
    loading: ({ commit }, payload) => {
      commit('LOADING', payload.payload)
    }
  }
})
