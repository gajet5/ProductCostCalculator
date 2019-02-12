import authServices from '../../services/auth';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async checkEmail(context, payload) {
      try {
        return await authServices.emailExist(payload.email);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async registration(context, payload) {
      try {
        return await authServices.registration({
          email: payload.email,
          password: payload.password
        });
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async confirm(context, payload) {
      try {
        return await authServices.confirm(payload.id);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async login(context, payload) {
      try {
        return await authServices.login(payload);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async forgotPassword(context, payload) {
      try {
        return await authServices.forgotPassword(payload);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
};
