import authServices from '../../services/auth';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async checkEmail(context, payload) {
      let result;

      try {
        result = await authServices.emailExist(payload.email);
      } catch (e) {
        console.log(e.message);
        return false;
      }

      return result.status;
    },
    async registration(context, payload) {
      let result;

      try {
        result = await authServices.registration({
          email: payload.email,
          password: payload.password
        });
      } catch (e) {
        console.log(e.message);
        return false;
      }

      return result.status;
    },
    async confirm(context, payload) {
      let result;

      try {
        result = await authServices.confirm(payload.id);
      } catch (e) {
        console.log(e.message);
        return false;
      }

      return result.status;
    }
  }
};
