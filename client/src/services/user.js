import Api from './Api';

export default {
  async getUserInfo() {
    try {
      let response = await Api().get('user/info');
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
