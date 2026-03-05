import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;
