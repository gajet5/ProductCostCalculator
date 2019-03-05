import userServices from '../../services/user';

export default {
  namespaced: true,
  state: {
    email: undefined,
    isActiveted: undefined,
    premium: undefined,
    premiumDateEnd: undefined
  },
  getters: {
    email(state) {
      return state.email;
    },
    isActiveted(state) {
      return state.isActiveted;
    },
    premium(state) {
      return state.premium;
    },
    premiumDateEnd(state) {
      return state.premiumDateEnd;
    }
  },
  mutations: {
    setEmail(state, payload) {
      state.email = payload;
    },
    setIsActiveted(state, payload) {
      state.isActiveted = payload;
    },
    setPremium(state, payload) {
      state.premium = payload;
    },
    setPremiumDateEnd(state, payload) {
      state.premiumDateEnd = payload;
    }
  },
  actions: {
    async getUserInfo(context) {
      try {
        let { data } = await userServices.getUserInfo();
        context.commit('setEmail', data.user.email);
        context.commit('setIsActiveted', data.user.isActiveted);
        context.commit('setPremium', data.user.premium);
        context.commit('setPremiumDateEnd', data.user.premiumDateEnd);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    async changePassword(context, newPassword) {
      return await userServices.changePassword(newPassword) === 200;
    },
    async reConfirmEmail(context) {
      try {
        return await userServices.reConfirmEmail(context.getters.email);
      } catch (e) {
        console.log(e);
      }
    },
    async enablePremium(context, code) {
      let result = await userServices.enablePremium(code);

      if (result.status === 200) {
        context.commit('setPremium', result.data.user.premium);
        context.commit('setPremiumDateEnd', result.data.user.premiumDateEnd);
      }

      return result;
    }
  }
};
