import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login';
import Registration from './pages/Registration';
import RegistrationConfirm from './pages/RegistrationConfirm';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Catalogs from './pages/Catalogs';
import User from './pages/User';
import Formulas from './pages/Formulas';
import { store } from './store';

Vue.use(VueRouter);

function ifAuthenticated(to, from, next) {
  let authStatus = !!store.getters.isAuthenticated || !!localStorage.getItem('token');

  switch (to.path) {
    case '/login':
    case '/registration':
      if (authStatus) {
        next('/catalogs');
      }
      break;
    case '/catalogs':
    case '/user':
    case '/formulas':
      if (!authStatus) {
        next('/login');
      }
      break;
  }
  next();
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
      component: Registration,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/registration/confirm/:id',
      component: RegistrationConfirm
    },
    {
      path: '/catalogs',
      component: Catalogs,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/user',
      component: User,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/formulas',
      component: Formulas,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
});
