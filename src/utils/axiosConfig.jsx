/* eslint-disable no-underscore-dangle */
import axios from 'axios';
// import { setCredentials } from '../store/auth/authSlice';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const sanitizeBaseUrl = (value = '') => value.trim().replace(/^['"]|['"]$/g, '');
const withTrailingSlash = (value) => (value.endsWith('/') ? value : `${value}/`);

const resolveBaseUrl = () => {
  const rawBaseUrl = sanitizeBaseUrl(process.env.NEXT_PUBLIC_FILE_BASE_URL || '');

  if (typeof window === 'undefined') {
    return rawBaseUrl;
  }

  if (!rawBaseUrl) {
    return withTrailingSlash(window.location.origin);
  }

  try {
    const parsed = new URL(rawBaseUrl, window.location.origin);

    // Prevent mixed-content errors when an http URL is configured by mistake.
    if (window.location.protocol === 'https:' && parsed.protocol === 'http:') {
      return `https://${parsed.host}/`;
    }

    return withTrailingSlash(`${parsed.origin}${parsed.pathname.replace(/\/$/, '')}`);
  } catch (error) {
    return withTrailingSlash(window.location.origin);
  }
};

const instance = axios.create({
  baseURL: resolveBaseUrl(),
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
