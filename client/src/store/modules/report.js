import documentsServices from '../../services/documents';

export default {
  namespaced: true,
  state: {
    documentId: null,
    document: null
  },
  getters: {
    documentId(state) {
      return state.documentId;
    }
  },
  mutations: {
    setDocumentId(state, payload) {
      // todo: записывать в локал стор по примеру документа
      state.documentId = payload;
    },
    setDocument(state, payload) {
      state.document = payload;
    }
  },
  actions: {
    async getDocument(context) {
      let { data } = await documentsServices.getDocument(context.getters.documentId);
      console.log(data);
      context.commit('setDocument', data.document);
    }
  }
};
