import axios from 'axios';

export default () => {
  return axios.create({
    // todo: Указать боевой сервер
    baseURL: 'http://localhost:4040/'
    // baseURL: 'http://185.53.168.29:4040/'
  });
};
