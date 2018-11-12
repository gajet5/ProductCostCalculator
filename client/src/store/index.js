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
    serverStatus: false,
    token: '',
    authStatus: '',
    breadcrumbs: [{
      text: 'Главная',
      disabled: false,
      href: '/'
    }],
    catalogs: [
      { name: 'Каталог #1' },
      { name: 'Каталог #2' },
      { name: 'Каталог #3' },
      { name: 'Каталог #4' },
      { name: 'Каталог #5' },
      { name: 'Каталог #6' },
      { name: 'Каталог #7' }
    ]
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
    authStatus(state) {
      return state.authStatus;
    },
    catalogsList(state) {
      return state.catalogs;
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
    authStatus(state, status) {
      state.authStatus = status;
    },
    spliceList(state, index) {
      state.catalogs.splice(index, 1);
    },
    pushList(state, item) {
      state.catalogs.push(item);
    },
    assignList(state, payload) {
      Object.assign(state.catalogs[payload.index], payload.item);
    },
    addBreadcrumbs(state, breadcrumbs) {
      state.breadcrumbs.push(breadcrumbs);
    },
    deleteLastBreadcrumbs(state) {
      state.breadcrumbs.splice(-1, 1);
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
      foo();
      setInterval(foo, 1000 * 5);
    },
    spliceList: (ctx, payload) => {
      ctx.commit('spliceList', payload.index);
    },
    pushList: (ctx, payload) => {
      ctx.commit('pushList', payload.item);
    },
    assignList: (ctx, payload) => {
      ctx.commit('assignList', payload);
    }
  }
});
