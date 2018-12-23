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
  },
  async changePassword(newPassword) {
    try {
      let { data } = await Api().patch('user/change-password', {
        newPassword: newPassword
      });
      return data.status;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async reConfirmEmail(email) {
    try {
      let { data } = await Api().get(`user/re-confirm-email?email=${email}`);
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async enablePremium(code) {
    try {
      let { data } = await Api().post(`user/enable-premium`, {
        code
      });
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
