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
    serverStatus: false
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
      async function foo() {
        try {
          await statusService.getServerStatus();
          ctx.commit('changeServerStatus', true);
        } catch (e) {
          console.log(e.message);
          ctx.commit('changeServerStatus', false);
        }
      }
      foo();

      setInterval(foo, 1000 * 5);
    }
  }
});
