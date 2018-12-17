import formulasServices from '../../services/formulas';

export default {
  namespaced: true,
  state: {
    totalCount: 0,
    formulas: [],
    loading: true
  },
  getters: {
    list(state) {
      return state.formulas;
    },
    totalCount(state) {
      return state.totalCount;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setFormulas(state, payload) {
      state.formulas = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getFormulas(context) {
      context.commit('setLoading', true);
      let resolve = await formulasServices.getFormulas();
      context.commit('setFormulas', resolve.data.formulas);
      context.commit('setTotalCount', resolve.data.totalCount);
      context.commit('setLoading', false);
    },
    async editFormula(context, payload) {
      await formulasServices.editFormula(payload);
      context.dispatch('getFormulas');
    },
    async addFormula(context, payload) {
      await formulasServices.addFormula(payload);
      context.dispatch('getFormulas');
    },
    async removeFormula(context, payload) {
      await formulasServices.removeFormula(payload);
      context.dispatch('getFormulas');
    }
  }
};
