import Api from './Api';

export default {
  async getFormulas() {
    try {
      let response = await Api().get('formulas/list');
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async addFormula(data) {
    try {
      let response = await Api().post('formulas/add', data);
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async editFormula(data) {
    try {
      let response = await Api().patch('formulas/edit', data);
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
