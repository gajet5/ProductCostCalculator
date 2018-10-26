import axios from 'axios';

export default () => {
  return axios.create({
    // todo: Указать боевой сервер
    baseURL: 'http://localhost:4040/'
  });
};
