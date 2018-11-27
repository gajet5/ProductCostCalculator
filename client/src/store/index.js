import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import auth from './modules/auth';
import user from './modules/user';
import statusService from '../services/status';
import router from '../routers';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    user
  },
  state: {
    serverStatus: true,
    token: '',
    breadcrumbs: []
  },
  getters: {
    serverStatus(state) {
      return state.serverStatus;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    breadcrumbs(state) {
      return state.breadcrumbs;
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
    },
    setBreadcrumbs(state, options) {
      if (state.breadcrumbs.length === 0) {
        state.breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));
        state.breadcrumbs.pop();
      }
      if (options.clear) {
        state.breadcrumbs = [];
      }
      if (options.add) {
        state.breadcrumbs.push(options.item);
      }
      if (options.remove) {
        state.breadcrumbs.pop();
      }
      localStorage.setItem('breadcrumbs', JSON.stringify(state.breadcrumbs));
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
