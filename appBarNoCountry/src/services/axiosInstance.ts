import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urlApi} from '../utils/definition';
import {Alert} from 'react-native';
import {store} from '../redux/store';
import {hideLoaderGlobal, showLoaderGlobal} from '../redux/actions';
const axiosInstance = axios.create({
  baseURL: urlApi,
});

let requestsCount = 0;

const showLoader = () => {
  if (requestsCount === 0) {
    store.dispatch(showLoaderGlobal());
  }
  requestsCount++;
};

const hideLoader = () => {
  requestsCount--;
  if (requestsCount === 0) {
    store.dispatch(hideLoaderGlobal());
  }
};

const setAuthorizationHeader = async (config: AxiosRequestConfig) => {
  const token: string | null = await AsyncStorage.getItem('accessTokenProfile');
  console.log('asdasd', token);

  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
};

axiosInstance.interceptors.request.use(
  async req => {
    await setAuthorizationHeader(req);
    showLoader();
    return req;
  },
  err => {
    hideLoader();
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  res => {
    hideLoader();
    return res;
  },
  err => {
    hideLoader();
    Alert.alert('Error', err.response.data.message, [
      {
        text: 'OK',
      },
    ]);
    // Maneja errores de respuesta aquí
    return Promise.reject(err);
  },
);

export default axiosInstance;
