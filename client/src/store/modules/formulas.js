import formulasServices from '../../services/formulas';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    formulas: [],
    loading: true
  },
  getters: {
    list(state) {
      return state.formulas;
    },
    totalItems(state) {
      return state.totalItems;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setFormulas(state, payload) {
      state.formulas = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getFormulas(context, payload) {
      context.commit('setLoading', true);
      let resolve = await formulasServices.getFormulas(payload);
      context.commit('setLoading', false);
      context.commit('setTotalItems', resolve.data.totalItems);
      context.commit('setFormulas', resolve.data.formulas);
    },
    async editFormula(context, payload) {
      await formulasServices.editFormula(payload);
    },
    async addFormula(context, payload) {
      await formulasServices.addFormula(payload);
    },
    async removeFormula(context, payload) {
      await formulasServices.removeFormula(payload);
    }
  }
};
