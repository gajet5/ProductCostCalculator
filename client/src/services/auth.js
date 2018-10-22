import Api from './Api';

export default {
  registration(credentials) {
    return Api().post('auth/registration', credentials);
  },
  emailExist(email) {
    return Api().get('auth/emailExist', {
      params: {
        email
      }
    });
  },
  confirm(id) {
    return Api().patch('auth/confirm', {
      params: {
        id
      }
    });
  }
};
