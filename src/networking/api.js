import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { serverAddress } from '../tools/config';

const instance = axios.create({
  baseURL: serverAddress,
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    if (store) {
      const state = store.getState();
      const token = accessTokenSelector(state);

      // If no token and not logging in, means user logged out and just do whatever the request was without enriching
      if (!token) {
        return config;
      }

      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
