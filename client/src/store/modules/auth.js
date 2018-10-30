import authServices from '../../services/auth';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async checkEmail(context, payload) {
      try {
        let response = await authServices.emailExist(payload.email);
        return response.data;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async registration(context, payload) {
      try {
        let response = await authServices.registration({
          email: payload.email,
          password: payload.password
        });
        return response.data;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async confirm(context, payload) {
      try {
        let response = await authServices.confirm(payload.id);
        return response.data;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async login(context, payload) {
      try {
        let response = await authServices.login(payload);
        return response.data;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
};
