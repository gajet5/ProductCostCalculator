import Api from './Api';

export default {
  async getCatalogs(payload) {
    try {
      let { sortBy, descending, page, rowsPerPage, search } = payload;
      let queryString = `catalogs/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}`;
      let { data } = await Api().get(queryString);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addCatalog(payload) {
    try {
      let { data } = await Api().post('catalogs/add', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editCatalog(payload) {
    try {
      let { data } = await Api().patch('catalogs/edit', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async removeCatalog(id) {
    try {
      let { data } = await Api().delete('catalogs/remove', {
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
