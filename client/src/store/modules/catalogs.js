import catalogsServices from '../../services/catalogs';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    catalogs: [],
    loading: true
  },
  getters: {
    list(state) {
      return state.catalogs;
    },
    totalItems(state) {
      return state.totalItems;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setCatalogs(state, payload) {
      state.catalogs = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getCatalogs(context, payload) {
      context.commit('setLoading', true);
      let resolve = await catalogsServices.getCatalogs(payload);
      context.commit('setLoading', false);
      context.commit('setTotalItems', resolve.data.totalItems);
      context.commit('setCatalogs', resolve.data.catalogs);
    },
    async editCatalog(context, payload) {
      await catalogsServices.editCatalog(payload);
    },
    async addCatalog(context, payload) {
      await catalogsServices.addCatalog(payload);
    },
    async removeCatalog(context, payload) {
      await catalogsServices.removeCatalog(payload);
    }
  }
};
