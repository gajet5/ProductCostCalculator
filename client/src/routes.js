import Vue from 'vue';
import VueRouter from 'vue-router';

import Registration from './pages/Registration';
import RegistrationConfirm from './pages/RegistrationConfirm';
import Welcome from './pages/Welcome';
import PageNotFound from './pages/PageNotFound';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Welcome
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
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
});
