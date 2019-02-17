import Api from './Api';

export default {
  async registration(credentials) {
    try {
      let { data } = await Api().post('auth/registration', credentials);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async changePassword(credentials) {
    try {
      let { data } = await Api().post('auth/change-password', credentials);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async emailExist(email) {
    try {
      let { data } = await Api().get(`auth/emailExist?email=${email}`);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async confirm(id) {
    try {
      let { data } = await Api().post('auth/confirm', {
        id
      });
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async login(credentials) {
    try {
      let { data } = await Api().post('auth/login', credentials);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async forgotPassword(email) {
    try {
      let { data } = await Api().get(`auth/forgotPassword?email=${email}`);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
