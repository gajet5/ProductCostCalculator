import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/Login';
import Registration from './pages/Registration';
import RegistrationConfirm from './pages/RegistrationConfirm';
import ChangePassword from './pages/ChangePassword';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';
import Catalogs from './pages/Catalogs';
import Documents from './pages/Documents';
import User from './pages/User';
import Help from './pages/Help';
import Report from './pages/Report';
import Formulas from './pages/Formulas';
import { store } from './store';

Vue.use(VueRouter);

async function ifAuthenticated(to, from, next) {
  await store.dispatch('getServerStatus');
  
  if (!store.getters.serverStatus) {
    return false;
  }

  await store.dispatch('getTokenStatus');
  await store.dispatch('user/getUserInfo');

  let authStatus = !!store.getters.isAuthenticated || !!localStorage.getItem('token');

  switch (to.path) {
    case '/login':
    case '/registration':
      if (authStatus) {
        next('/catalogs');
      }
      break;
    case '/catalogs':
    case '/documents':
    case '/user':
    case '/formulas':
    case '/report':
    case '/help':
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
      path: '/registration/renew/:id',
      component: ChangePassword,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/registration/confirm/:id',
      component: RegistrationConfirm,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/catalogs',
      component: Catalogs,
      beforeEnter: ifAuthenticated,
      meta: {
        breadcrumb: [
          {
            text: 'Каталоги',
            disabled: true,
            href: '/catalogs'
          }
        ]
      }
    },
    {
      path: '/documents',
      component: Documents,
      beforeEnter: ifAuthenticated,
      meta: {
        breadcrumb: [
          {
            text: 'Каталоги',
            disabled: false,
            href: '/catalogs'
          },
          {
            text: 'Документы',
            disabled: true,
            href: '/documents'
          }
        ]
      }
    },
    {
      path: '/report',
      component: Report,
      beforeEnter: ifAuthenticated,
      meta: {
        breadcrumb: [
          {
            text: 'Каталоги',
            disabled: false,
            href: '/catalogs'
          },
          {
            text: 'Документы',
            disabled: false,
            href: '/documents'
          },
          {
            text: 'Отчёт',
            disabled: true,
            href: '/report'
          }
        ]
      }
    },
    {
      path: '/user',
      component: User,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/help',
      component: Help,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/formulas',
      component: Formulas,
      beforeEnter: ifAuthenticated,
      meta: {
        breadcrumb: [
          {
            text: 'Каталоги',
            disabled: false,
            href: '/catalogs'
          }
        ]
      }
    },
    {
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
});
