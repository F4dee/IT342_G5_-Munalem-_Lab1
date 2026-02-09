import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const TOKEN_KEY = 'auth_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common.Authorization;
}

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function registerUser(payload) {
  const response = await api.post('/api/auth/register', payload);
  return response.data;
}

export async function loginUser(payload) {
  const response = await api.post('/api/auth/login', payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get('/api/user/me');
  return response.data;
}

