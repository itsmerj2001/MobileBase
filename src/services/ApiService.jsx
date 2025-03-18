import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const api = axios.create({
  baseURL: `http://172.16.9.170:8001/api/v1`
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    return Promise.reject(error.response);
  }
);


const apiRequest = async (method, url, data = {}, config = {}) => {
  try {
    const response = await api[method](url, data, config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error?.data || error.message;
  }
};


const Apis = {
  login: (payload) => apiRequest('post', '/users/login', payload),
  register: (payload) => apiRequest('post', '/users/signup', payload),
  forgotPassword: (payload) => apiRequest('post', '/users/forgotPassword', payload),
  resetPassword: (payload) => apiRequest('patch', '/users/resetPassword', payload),
  getAllUsers: () => apiRequest('get', '/users/'),
  getUser: (userId) => apiRequest('get', `/users/${userId}`),
  updateUser: (userId, payload) => apiRequest('patch', `/users/${userId}`, payload),
  getUserDetails: () => apiRequest('get', '/users/fetchDetails'),
  updateProfile: (payload) => apiRequest('patch', '/users/updateMe', { payload })
};

export default Apis;
