import Api from './Api';

export default {
  async getServerStatus() {
    try {
      let { data } = await Api().get('');
      return data;
    } catch (e) {
      console.log(e);
      throw new Error('Сервер не доступен');
    }
  },
  async getTokenStatus() {
    try {
      let { data } = await Api().get('token/status');
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
