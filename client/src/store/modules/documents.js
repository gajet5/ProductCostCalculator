import documentsServices from '../../services/documents';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    documents: [],
    loading: true,
    catalogId: '',
    catalogName: ''
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
    },
    catalogId(state) {
      return state.catalogId;
    },
    catalogName(state) {
      return state.catalogName;
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
    },
    setCatalogId(state, payload) {
      if (payload === 'delete') {
        state.catalogId = '';
        localStorage.removeItem('catalogId');
        return;
      }
      if (!state.catalogId && !payload) {
        state.catalogId = localStorage.getItem('catalogId');
        return;
      }
      if (payload) {
        state.catalogId = payload;
        localStorage.setItem('catalogId', state.catalogId);
      }
    },
    setCatalogName(state, payload) {
      state.catalogName = payload;
    }
  },
  actions: {
    async getDocuments(context, payload) {
      if (!context.getters.catalogId) {
        return;
      }
      context.commit('setLoading', true);
      let resolve = await documentsServices.getDocuments(payload);
      context.commit('setLoading', false);
      context.commit('setTotalItems', resolve.data.totalItems);
      context.commit('setDocuments', resolve.data.documents);
      context.commit('setCatalogName', resolve.data.catalogName);
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
