import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import auth from './modules/auth';
import statusService from '../services/status';
import router from '../routers';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth
  },
  state: {
    serverStatus: true,
    token: ''
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    },
    isAuthenticated(state) {
      return !!state.token;
    }
  },
  mutations: {
    setServerStatus(state, status) {
      state.serverStatus = status;
    },
    setToken(state, token) {
      if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['x-access-token'] = token;
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-access-token'];
        router.push('/login');
      }
      state.token = token;
    }
  },
  actions: {
    async getServerStatus(ctx) {
      async function wrapper() {
        try {
          await statusService.getServerStatus();
          ctx.commit('setServerStatus', true);
        } catch (e) {
          console.log(e.message);
          ctx.commit('setServerStatus', false);
          setTimeout(async () => {
            await wrapper();
          }, 1000 * 5);
        }
      }
      await wrapper();
    },
    async getTokenStatus(ctx) {
      try {
        let responce = await statusService.getTokenStatus();
        if (responce.data.status !== 200) {
          ctx.commit('setToken', false);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }
});
