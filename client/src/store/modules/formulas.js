import formulasServices from '../../services/formulas';

export default {
  namespaced: true,
  state: {
    formulas: []
  },
  getters: {
    list(state) {
      return state.formulas;
    }
  },
  mutations: {
    setFormulas(status, payload) {
      status.formulas = payload;
    }
  },
  actions: {
    async getFormulas(context) {
      let resolve = await formulasServices.getFormulas();
      context.commit('setFormulas', resolve.data.formulas);
    }
  }
};
