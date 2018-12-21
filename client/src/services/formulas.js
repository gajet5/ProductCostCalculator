import Api from './Api';

export default {
  async getFormulas(payload) {
    try {
      let { sortBy, descending, page, rowsPerPage, search } = payload;
      let queryString = `formulas/list?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}&search=${search}`;
      let { data } = await Api().get(queryString);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addFormula(payload) {
    try {
      let { data } = await Api().post('formulas/add', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editFormula(payload) {
    try {
      let { data } = await Api().patch('formulas/edit', payload);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async removeFormula(id) {
    try {
      let { data } = await Api().delete('formulas/remove', {
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
