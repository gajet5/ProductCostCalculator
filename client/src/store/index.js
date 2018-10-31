import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
    token: '',
    authStatus: ''
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    authStatus(state) {
      return state.authStatus;
    }
  },
  mutations: {
    changeServerStatus(state, status) {
      state.serverStatus = status;
    },
    setToken(state, token) {
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      state.token = token;
    },
    authStatus(state, status) {
      state.authStatus = status;
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
