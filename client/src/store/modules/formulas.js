import formulasServices from '../../services/formulas';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    formula: null,
    formulas: [],
    formulasName: [],
    loading: true
  },
  getters: {
    formula(state) {
      return state.formula;
    },
    list(state) {
      return state.formulas;
    },
    namesList(state) {
      return state.formulasName;
    },
    totalItems(state) {
      return state.totalItems;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setFormula(state, payload) {
      state.formula = payload;
    },
    setFormulas(state, payload) {
      state.formulas = payload;
    },
    setFormulasName(state, payload) {
      state.formulasName = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    updateOperandName(state, payload) {
      let index = state.formulas.findIndex(el => el.name === payload.formulaName);
      state.formulas[index].formula[payload.formulaIndex].name = payload.updateName;
    }
  },
  actions: {
    async getFormula(context, payload) {
      let resolve = await formulasServices.getFormula(payload);
      context.commit('setFormula', resolve.data.formula);
    },
    async getFormulas(context, payload) {
      context.commit('setLoading', true);
      let resolve = await formulasServices.getFormulas(payload);
      context.commit('setLoading', false);
      context.commit('setTotalItems', resolve.data.totalItems);
      context.commit('setFormulas', resolve.data.formulas);
    },
    async getFormulasName(context) {
      let resolve = await formulasServices.getFormulasName();
      context.commit('setFormulasName', resolve.data.names);
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
