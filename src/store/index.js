import Vue from 'vue';
import Vuex from 'vuex';

// 全局调用Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  state: {
    count: 0,
    num: 1,
  },
  mutations: {
    increment(state, num) {
      state.count++;
      state.num = num;
    },
  },
  // 调用increment函数
  actions: {
    inc({ commit }, obj) {
      commit('increment', obj);
    },
  },
  modules: {},
});
