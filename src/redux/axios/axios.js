import axios from 'axios';
import { serverAddress } from '../../tools/config';
import { store } from '../store/store';
import AsyncStorage from '@react-native-community/async-storage';
import { setAlert } from '../actions/alertActions';
import { refreshToken } from '../actions/authActions';
const NETWORK_ERROR = 'Network Error';
const GET = 'get';
const POST = 'post';

const instance = axios.create({
  timeout: 5000,
});
instance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    let token = state.auth.token;
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    console.log('request error', error);
  },
);

instance.interceptors.response.use(
  async (response) => {
    const { url, method } = response.config;
    const { data } = response;
    console.log('statusssss', response.status);
    return response;
  },
  async (error) => {
    console.log('staus', error);
    if (error.response.status === 401) {
      store.dispatch(refreshToken());
    }
    // if (error.message === NETWORK_ERROR || error.request.status > 500) {
    //   const {url, method} = error.config;

    // } else if (
    //   error.request.status === 400 &&
    //   error.response.data.message !== ''
    // ) {
    //   store.dispatch(setAlert(error?.response?.data?.message, 'success', 3000));
    //   return;
    // }
    return Promise.reject(error);
  },
);

export default instance;
