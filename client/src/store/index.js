import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';

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
    serverStatus(ctx) {
      function foo() {
        console.log(1);
        ctx.commit('changeServerStatus', Math.random() > 0.5);
      }

      setInterval(foo, 1000 * 5);
      foo();
    }
  }
});
