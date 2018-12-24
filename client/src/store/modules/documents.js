import documentsServices from '../../services/documents';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    documents: [],
    loading: true
  },
  getters: {
    list(state) {
      return state.documents;
    },
    totalItems(state) {
      return state.totalItems;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setDocuments(state, payload) {
      state.documents = payload;
    },
    setTotalItems(state, payload) {
      state.totalItems = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getDocuments(context, payload) {
      context.commit('setLoading', true);
      let resolve = await documentsServices.getDocuments(payload);
      context.commit('setLoading', false);
      context.commit('setTotalItems', resolve.data.totalItems);
      context.commit('setDocuments', resolve.data.documents);
    },
    async editDocument(context, payload) {
      await documentsServices.editDocument(payload);
    },
    async addDocument(context, payload) {
      await documentsServices.addDocument(payload);
    },
    async removeDocument(context, payload) {
      await documentsServices.removeDocument(payload);
    }
  }
};
