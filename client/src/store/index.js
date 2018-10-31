import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import statusService from '../services/status';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth
  },
  state: {
    serverStatus: false,
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    }
  },
  mutations: {
    changeServerStatus(state, status) {
      state.serverStatus = status;
    },
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
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
    },
    setToken(context, token) {
      context.commit('setToken', token);
    },
    setUser(context, user) {
      context.commit('setUser', user);
    }
  }
});
