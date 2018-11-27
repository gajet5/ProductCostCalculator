import userServices from '../../services/user';

export default {
  namespaced: true,
  state: {
    isActiveted: undefined,
    premium: undefined,
    premiumDateEnd: undefined
  },
  getters: {
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
    setIsActiveted(state, playload) {
      state.isActiveted = playload;
    },
    setPremium(state, playload) {
      state.premium = playload;
    },
    setPremiumDateEnd(state, playload) {
      state.premiumDateEnd = playload;
    }
  },
  actions: {
    async getUserInfo(context) {
      try {
        let { data } = await userServices.getUserInfo();
        context.commit('setIsActiveted', data.user.isActiveted);
        context.commit('setPremium', data.user.premium);
        context.commit('setPremiumDateEnd', data.user.premiumDateEnd);
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
};
