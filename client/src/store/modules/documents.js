import documentsServices from '../../services/documents';

export default {
  namespaced: true,
  state: {
    totalItems: 0,
    documents: [],
    loading: true,
    catalogId: '',
    catalogName: '',
    positions: []
  },
  getters: {
    documents(state) {
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
    },
    positions(state) {
      return state.positions;
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
        localStorage.setItem('catalogId', payload);
      }
    },
    setCatalogName(state, payload) {
      state.catalogName = payload;
    },
    setPositions(state, payload) {
      state.positions = payload;
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
    async getPositions(context) {
      let resolve = await documentsServices.getPositions();
        context.commit('setPositions', resolve.data.positions);
    },
    async addDocument(context, payload) {
      await documentsServices.addDocument(payload);
    },
    async addPositions(context, payload) {
      await documentsServices.addPositions(payload);
    },
    async editDocument(context, payload) {
      await documentsServices.editDocument(payload);
    },
    async removeDocument(context, payload) {
      await documentsServices.removeDocument(payload);
    },
    async deletePositions(context, payload) {
      await documentsServices.deletePositions(payload);
    }
  }
};
