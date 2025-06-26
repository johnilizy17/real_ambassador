import axios from 'axios';
import axiosRetry from 'axios-retry';
import { store } from '@/redux/store/store';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from '@/utils/storage';
import ROUTES from '@/utils/ROUTES';
import { logout } from '@/redux/slices/auth/authSlice';

const baseURL = 'http://127.0.0.1:8787/api/v1/';

export const userRequest = axios.create({ baseURL });
export const publicRequest = axios.create({ baseURL });
export const userFileUpload = axios.create({
  baseURL,
  headers: { 'Content-Type': 'multipart/form-data' },
});

let refreshAttempted = false; // Track refresh failure

const handleLogout = async () => {
  refreshAttempted = false;
  clearTokens();
  await store.dispatch(logout());

  if (window.location.pathname === ROUTES.login) return;

  window.location.href = ROUTES.login;
};

// Request Interceptor: Attach Token
userRequest.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

userFileUpload.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry
userRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
  
    const originalRequest = error.config;

    // If 401 and not retried yet
    if (error.response.data?.statusCode=== 401 && !originalRequest._retry) {
      if (refreshAttempted) {
        handleLogout(); // Logout after one failed refresh
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      refreshAttempted = true;
    }
    //   try {
    //     const refreshToken = getRefreshToken();
    //     if (!refreshToken) throw new Error('No refresh token available');

    //     const { data } = await axios.post(`${baseURL}auth/refresh-tokens`, {
    //       refresh_token: refreshToken,
    //     });

    //     saveTokens({
    //       accessToken: data.data.access.token,
    //       refreshToken: data.data.refresh.token,
    //       expiresIn: data.data.access.expires,
    //     });

    //     originalRequest.headers.Authorization = `Bearer ${data.data.access.token}`;
    //     return axios(originalRequest);
    //   } catch (refreshError) {
    //     handleLogout();
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

// Apply Axios Retry (Retries only once)
axiosRetry(userRequest, {
  retries: 1,
});
