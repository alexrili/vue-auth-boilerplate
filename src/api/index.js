import axios from 'axios';
import store from '@/store';


const init = () => {

  // Using a fake API to make test's
  // If you want to know more about, please check it out 
  // thei github repo https://github.com/benhowdle89/reqres
  axios.defaults.baseURL = 'https://reqres.in/api/';

  if (store.getters.isAuthenticated) {
    const token = store.state.auth.token
    axios.defaults.headers.common['Authorization'] = token;
  }
};

const setAuthorization = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

const removeAuthorization = () => {
  delete axios.defaults.headers.common['Authorization'];
};

const get = uri => {
  return axios.get(uri);
};

const post = (uri, data) => {
  return axios.post(uri, data);
};

const put = (uri, data) => {
  data._method = 'put';
  return post(uri, data);
};

const del = uri => {
  return axios.delete(uri);
};

export default {
  get,
  post,
  put,
  del,
  setAuthorization,
  removeAuthorization,
  init
};
