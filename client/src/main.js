import Vue from 'vue';
import App from './App.vue';
import 'babel-polyfill';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'

import {store} from "./store";
import router from "./routes";

Vue.use(Vuetify);

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
