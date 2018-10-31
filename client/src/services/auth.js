import Api from './Api';

export default {
  async registration(credentials) {
    try {
      return await Api().post('auth/registration', credentials);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async emailExist(email) {
    try {
      return await Api().get('auth/emailExist', {
        params: {
          email
        }
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async confirm(id) {
    try {
      return await Api().patch('auth/confirm', {
        params: {
          id
        }
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async login(credentials) {
    try {
      return await Api().post('auth/login', credentials);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
