// Modules
import axios from 'axios';

const URL = 'https://api-cis-backend.herokuapp.com/'

export const axiosInstance = axios.create({ baseURL:URL });

export const axiosInstanceWithAuth = axios.create({ baseURL:URL });

axiosInstanceWithAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('cis-token') as string;
  // @ts-ignore
  config.headers.Authorization = `Bearer ${token}`
  return config
});

axiosInstanceWithAuth.interceptors.response.use(() => {

});