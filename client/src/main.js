import Vue from 'vue';
import App from './App.vue';
import 'babel-polyfill';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import { sync } from 'vuex-router-sync';
import { store } from './store';
import router from './routers';

Vue.use(Vuetify);
sync(store, router);

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
