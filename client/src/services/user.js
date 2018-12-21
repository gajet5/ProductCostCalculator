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
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async reConfirmEmail(email) {
    let { data } = await Api().get(`user/re-confirm-email?email=${email}`);
    return data;
  }
};
