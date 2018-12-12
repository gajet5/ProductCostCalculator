import formulasServices from '../../services/formulas';

export default {
  namespaced: true,
  state: {
    totalCount: 0,
    formulas: []
  },
  getters: {
    list(state) {
      return state.formulas;
    },
    totalCount(state) {
      return state.totalCount;
    }
  },
  mutations: {
    setFormulas(state, payload) {
      state.formulas = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    }
  },
  actions: {
    async getFormulas(context) {
      let resolve = await formulasServices.getFormulas();
      context.commit('setFormulas', resolve.data.formulas);
      context.commit('setTotalCount', resolve.data.totalCount);
    },
    async editFormula(context, payload) {
      await formulasServices.editFormula(payload);
    },
    async addFormula(context, payload) {
      await formulasServices.addFormula(payload);
    }
  }
};
