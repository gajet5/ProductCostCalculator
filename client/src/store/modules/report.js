import documentsServices from '../../services/documents';

export default {
  namespaced: true,
  state: {
    documentId: null,
    document: null,
    loading: false
  },
  getters: {
    documentId(state) {
      return state.documentId;
    },
    document(state) {
      return state.document;
    },
    loading(state) {
      return state.loading;
    }
  },
  mutations: {
    setDocumentId(state, payload) {
      if (payload === 'delete') {
        state.documentId = '';
        localStorage.removeItem('documentId');
        return;
      }
      if (!state.documentId && !payload) {
        state.documentId = localStorage.getItem('documentId');
        return;
      }
      if (payload) {
        localStorage.setItem('documentId', payload);
        state.documentId = payload;
      }
    },
    setDocument(state, payload) {
      state.document = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    async getDocument(context) {
      context.commit('setLoading', true);
      let { data } = await documentsServices.getDocument(context.getters.documentId);
      context.commit('setLoading', false);
      context.commit('setDocument', data.document[0]);
    }
  }
};
