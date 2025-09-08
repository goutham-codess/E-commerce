import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) =>
    api.post('/auth/register', userData),
  login: (credentials) =>
    api.post('/auth/login', credentials),
};

// Items API
export const itemsAPI = {
  getItems: (filters) => api.get('/items', { params: filters }),
  getItem: (id) => api.get(`/items/${id}`),
  getCategories: () => api.get('/items/meta/categories'),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (itemId, quantity = 1) =>
    api.post('/cart/add', { itemId, quantity }),
  updateCart: (itemId, quantity) =>
    api.put('/cart/update', { itemId, quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/remove/${itemId}`),
};