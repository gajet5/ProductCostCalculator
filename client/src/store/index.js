import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import auth from './modules/auth';
import user from './modules/user';
import formulas from './modules/formulas';
import catalogs from './modules/catalogs';
import documents from './modules/documents';
import statusService from '../services/status';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    user,
    formulas,
    catalogs,
    documents
  },
  state: {
    serverStatus: true,
    token: '',
    breadcrumbs: [],
    catalogSelected: ''
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
    },
    catalogSelected(state) {
      return state.catalogSelected;
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
      }
      state.token = token;
    },
    setBreadcrumbs(state, options) {
      state.breadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs'));

      if (!state.breadcrumbs) {
        state.breadcrumbs = [];
      }

      if (options.clear) {
        state.breadcrumbs = [];
      }

      if (options.add) {
        for (let item of state.breadcrumbs) {
          if (item.text === options.item.text) {
            return false;
          }
        }
        state.breadcrumbs.push(options.item);
      }

      if (options.remove) {
        state.breadcrumbs.pop();
      }

      localStorage.setItem('breadcrumbs', JSON.stringify(state.breadcrumbs));
    },
    setCatalogSelected(state, payload) {
      if (!state.catalogSelected && !payload) {
        state.catalogSelected = localStorage.getItem('catalogSelected');
        return false;
      }
      if (payload) {
        state.catalogSelected = payload;
        localStorage.setItem('catalogSelected', state.catalogSelected);
      }
    }
  },
  actions: {
    async getServerStatus(ctx) {
      async function wrapper() {
        try {
          let result = await statusService.getServerStatus();
          if (result.status === 200) {
            ctx.commit('setServerStatus', true);
          }
        } catch (e) {
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
        let result = await statusService.getTokenStatus();
        if (result.status !== 200) {
          ctx.commit('setToken', false);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }
});
