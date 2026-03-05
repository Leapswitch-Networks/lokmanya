/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// import { setCredentials } from '../store/auth/authSlice';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILE_BASE_URL,
  withCredentials: true,
});

const externalAxios = axios.create({
  baseURL: process.env.REACT_APP_WORDPRESS_URL
});

instance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: accessToken,
        Accept: 'application/json',
      };
    }
    if (config.method === 'get') {
      config.params = config.params || {};
      config.params._ = Date.now();
    }

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    return Promise.reject(error);
  }
);

export default instance;
export { externalAxios };

