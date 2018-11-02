import Api from './Api';

export default {
  getServerStatus() {
    return Api().get('');
  },
  getTokenStatus() {
    return Api().get('token/status');
  }
};
