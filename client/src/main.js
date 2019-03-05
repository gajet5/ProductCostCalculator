import 'babel-polyfill';
import 'event-source-polyfill';

import Vue from 'vue';
import App from './App.vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { store } from './store';
import router from './routers';

Vue.use(Vuetify, {
  iconfont: 'md'
});

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
