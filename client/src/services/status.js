import Api from './Api';

export default {
  async getServerStatus() {
    try {
      return await Api().get('');
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async getTokenStatus() {
    try {
      return await Api().get('token/status');
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
