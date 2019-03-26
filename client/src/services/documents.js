import Api from './Api';

export default {
  async getDocuments(payload) {
    try {
      let { sortBy, descending, page, rowsPerPage, search, catalogId } = payload;
      let queryString = `documents/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}&catalogId=${catalogId}`;
      let { data } = await Api().get(queryString);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async getDocument(payload) {
    try {
      let queryString = `documents/document?documentId=${payload}`;
      let { data } = await Api().get(queryString);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async getPositions() {
    try {
      let { data } = await Api().get('documents/positions');
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addDocument(payload) {
    try {
      let { data } = await Api().post('documents/add', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addPositions(payload) {
    try {
      let { data } = await Api().post('documents/add-positions', { name: payload });
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editDocument(payload) {
    try {
      let { data } = await Api().post('documents/edit', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async removeDocument(id) {
    try {
      let { data } = await Api().delete('documents/remove', {
        data: {
          id: `${id}`
        }
      });
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async deletePositions(id) {
    try {
      let { data } = await Api().delete('documents/delete-positions', {
        data: {
          id: `${id}`
        }
      });
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
