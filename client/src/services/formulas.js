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
  }
};
