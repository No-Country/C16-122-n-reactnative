import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {urlApi} from './utils/definition';

const API_BASE_URL = urlApi;

const EXEMPTED_ROUTES = ['/auth/sign-up', '/auth/login'];
const EXEMPTED_ROUTES2 = ['/auth/login/profile'];

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUpApi = async userData => {
  try {
    const response = await api.post('/auth/sign-up', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogin = async userData => {
  console.log('USERDATA', userData);
  try {
    const response = await api.post('/auth/login', userData);

    //  console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

api.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const accessTokenProfile = await AsyncStorage.getItem('accessTokenProfile');
    console.log('INTERCEPTO', config)
    if (!EXEMPTED_ROUTES.includes(config.url)) {
      console.log('INTERCEPTO2', accessToken)
      if (!EXEMPTED_ROUTES2.includes(config.url)) {
        console.log('INTERCEPTO3')
        if (accessTokenProfile) {
          console.log('INTERCEPTO4', accessTokenProfile);
          config.headers.Authorization = `Bearer ${accessTokenProfile}`;
        }
      }
      if (EXEMPTED_ROUTES2.includes(config.url)) {
        console.log('INTERCEPTO2b')
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//PERFILES APIS

export const apiCreateProfile = async userData => {
  console.log('USERDATA', userData);
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.post(`${urlApi}/profiles`, userData,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR PERFIL', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiEditProfile = async userData => {
  console.log('USERDATA', userData);
  const data = {
    "name": userData.name,
    "role": userData.role,
    "pinCode":userData.pinCode
  }
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.patch(`${urlApi}/profiles/${userData.id}`, data,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR PERFIL', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiDeleteProfile = async id => {
  console.log('ID', id);

  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.delete(`${urlApi}/profiles/${id}`,   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return {status: true};
  } catch (error) {
    console.log('ERROR PERFIL', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

//Categorias API
export const apiCreateCategory = async categoryData => {
  console.log('CategoryData', categoryData);
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.post(`${urlApi}/product-categories`, categoryData,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR Category', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiEditCategory = async categoryData => {
  console.log('categoryData', categoryData);
  const data = {
    "name": categoryData.name,
    "description": categoryData.description
  }
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.patch(`${urlApi}/product-categories/${categoryData.id}`, data,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR Category', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiDeleteCategory = async id => {
  console.log('ID', id);

  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.delete(`${urlApi}/product-categories/${id}`,   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return {status: true};
  } catch (error) {
    console.log('ERROR PERFIL', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

//Productos API

export const apiCreateProduct = async productData => {
  console.log('productData', productData);
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.post(`${urlApi}/products`, productData,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR Producto', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiEditProduct = async productData => {
  console.log('productData', productData);
  const data = {
    "name": productData.name,
    "description": productData.description,
    "price": productData.price,
    "productCategoryId": productData.productCategoryId,
  }
  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.patch(`${urlApi}/products/${productData.id}`, data,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return response.data;
  } catch (error) {
    console.log('ERROR Producto', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

export const apiDeleteProduct = async id => {
  console.log('ID', id);

  const token = await AsyncStorage.getItem('accessTokenProfile');
  try {
    const response = await axios.delete(`${urlApi}/products/${id}`,   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

      console.log('Respuesta del servidor:', response.data);

    return {status: true};
  } catch (error) {
    console.log('ERROR Producto', error)
    return {status: false}
    throw error; // Puedes manejar el error según sea necesario en tu aplicación
    //  console.log(error);
  }
};

//MESAS APIS
export const createTables = async numTables => {
  const token = await AsyncStorage.getItem('accessTokenProfile');

  if (numTables > 0) {
    try {
      for (let i = 0; i < numTables; i++) {
        try {
          const response = await axios.post(
            `${urlApi}/tables`,
            {
              isOccupied: false,
              ability: 5,
              location: 'medio',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log('response' + i, response.data);
        } catch (error) {
          console.log('BAD RESPONSE');
        }
      }

      console.log('FINALIZADA LA CREACION DE TABLAS');
      return {status: true};
    } catch (error) {
      return {status: false};
    }
  } else {
    return {status: false};
  }
};

export const deleteTables = async (id) => {
  const token = await AsyncStorage.getItem('accessTokenProfile');
  console.log('ESTE ID EN DELETED', id);
  const urlDelete= `${urlApi}/tables/${id}`
  console.log('URL',urlDelete)
  try {
    const response = await axios.delete(urlDelete, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response.data);

    console.log('FINALIZADA LA ELIMINACION DE TABLA');
    return {status: true};
  } catch (error) {
    console.log('ERROR: ' + error.message)
    return {status: false};
  }
};

export const postLoginProfile = async (pin, idProfile) => {
  const token = await AsyncStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `${urlApi}/auth/login/profile`,
      {
        pinCode: pin,
        profileId: idProfile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const newToken = response.data.token;
    const role = response.data.profile.role;
    AsyncStorage.setItem('accessTokenProfile', newToken);
    AsyncStorage.setItem('role', role);

    console.log('response', response.data, 'ROL', role);
    return response.data;
  } catch (error) {
    return {status: false};
  }
};

export default api;
