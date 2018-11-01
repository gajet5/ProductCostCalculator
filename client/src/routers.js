import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login';
import Registration from './pages/Registration';
import RegistrationConfirm from './pages/RegistrationConfirm';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Catalogs from './pages/Catalogs';
import { store } from './store';

Vue.use(VueRouter);

function ifNotAuthenticated(to, from, next) {
  if (store.getters.isAuthenticated || localStorage.getItem('token')) {
    return next();
  }
  next('/login');
}

function ifAuthenticated(to, from, next) {
  if (!store.getters.isAuthenticated || !localStorage.getItem('token')) {
    return next();
  }
  next('/catalogs');
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Welcome
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/registration',
      component: Registration
    },
    {
      path: '/registration/confirm/:id',
      component: RegistrationConfirm
    },
    {
      path: '/catalogs',
      component: Catalogs,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
});
