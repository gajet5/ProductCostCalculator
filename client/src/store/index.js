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
    authStatus: '',
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
    authStatus(state) {
      return state.authStatus;
    },
    catalogsList(state) {
      return state.catalogs;
    }
  },
  mutations: {
    changeServerStatus(state, status) {
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
