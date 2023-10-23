// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('refreshToken')
  },
  mutations: {
    SET_LOGIN_STATE(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {
    setLoginState({ commit }, status) {
      commit('SET_LOGIN_STATE', status);
    }
  }
});