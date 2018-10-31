import Api from './Api';

export default {
  getServerStatus() {
    return Api().get('');
  }
};
