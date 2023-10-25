// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiEndpoint: process.env.VUE_APP_API_ENDPOINT,
    isLoggedIn: !!localStorage.getItem('refreshToken'),
    selectedOrderType: 'CREATED_AT',
    selectedSortOrder: 'DESCENDING',
    selectedCategory: 'PRODUCT_TYPE_ALL',
    receivedProducts: [],
    currentPage: 0,
    totalPages: 0,
    pageSize: 20,
    searchKeyword: '',
  },
  mutations: {
    SET_LOGIN_STATE(state, status) {
      state.isLoggedIn = status;
    },
    SET_SELECTED_ORDER_TYPE(state, payload) {
      state.selectedOrderType = payload;
    },
    SET_SELECTED_SORT_ORDER(state, payload) {
      state.selectedSortOrder = payload;
    },
    SET_SELECTED_PRODUCT_TYPE(state, payload){
      state.selectedCategory = payload;
    },
    SET_RECEIVED_PRODUCTS(state, products){
      state.receivedProducts = products;
    },
    INCREMENT_CURRENT_PAGE(state) {
      state.currentPage++;
    },
    DECREMENT_CURRENT_PAGE(state) {
        state.currentPage--;
    },
    SET_CURRENT_PAGE(state, page) {
        state.currentPage = page;
    },
    SET_TOTAL_PAGE(state, page){
        state.totalPages = page
    },
    SET_SEARCH_KEYWORD(state, keyword) {
      state.searchKeyword = keyword;
    },
  },
  actions: {
    setLoginState({ commit }, status) {
      commit('SET_LOGIN_STATE', status);
    },
    async fetchGetProducts({ state, commit }) {
      const params = {
          orderType: state.selectedOrderType,
          productType: state.selectedCategory,
          sortOrder: state.selectedSortOrder,
          page: state.currentPage,
          size: state.pageSize,
          keyword: state.searchKeyword,
      };
      
      try {
          const response = await axios.get(`${state.apiEndpoint}product`, { params: params });
          commit('SET_RECEIVED_PRODUCTS', response.data.data.content);
          commit('SET_TOTAL_PAGE', response.data.data.totalPages);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
    }
  }
  
});