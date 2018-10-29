import authServices from '../../services/auth';

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async checkEmail(context, payload) {
      return await authServices.emailExist(payload.email).status;
    },
    async registration(context, payload) {

      return await authServices.registration({
        email: payload.email,
        password: payload.password
      }).status;
    },
    async confirm(context, payload) {
      return await authServices.confirm(payload.id).status;
    }
  }
}
