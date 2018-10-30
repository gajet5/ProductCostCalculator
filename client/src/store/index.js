import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';

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
    serverStatus(ctx) {
      function foo() {
        // console.log(1);
        // ctx.commit('changeServerStatus', Math.random() > 0.5);
      }

      setInterval(foo, 1000 * 5);
      foo();
    },
    setToken(context, token) {
      context.commit('setToken', token);
    },
    setUser(context, user) {
      context.commit('setUser', user);
    }
  }
});
