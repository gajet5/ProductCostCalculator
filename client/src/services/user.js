import Api from './Api';

export default {
  async getUserInfo() {
    try {
      let { data } = await Api().get('user/info');
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
