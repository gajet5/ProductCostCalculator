import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import statusService from '../services/status';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
    serverStatus: true
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    }
  },
  mutations: {
    changeServerStatus(state, payload) {
      state.serverStatus = payload;
    }
  },
  actions: {
    async serverStatus(ctx) {
      let result;
      try {
        result = await statusService.getServerStatus();
      } catch (e) {
        console.log(e.message);
        result = { 'status': -1 };
      }
      ctx.commit('changeServerStatus', result.status === 200);
    }
  }
});
