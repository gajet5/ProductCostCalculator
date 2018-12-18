import Api from './Api';

export default {
  async getFormulas(payload) {
    try {
      let { sortBy, descending, page, rowsPerPage } = payload;
      let queryString = `formulas/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}`;
      let response = await Api().get(queryString);
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addFormula(payload) {
    try {
      let response = await Api().post('formulas/add', payload);
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editFormula(payload) {
    try {
      let response = await Api().patch('formulas/edit', payload);
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async removeFormula(id) {
    try {
      let response = await Api().delete('formulas/remove', {
        data: {
          id: `${id}`
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
