import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("access_token");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const refreshToken = localStorage.getItem("refresh_token");

    //     const { data } = await axios.post(
    //       "/auth/refresh",
    //       { refresh_token: refreshToken },
    //       { baseURL: api.defaults.baseURL }
    //     );

    //     localStorage.setItem("access_token", data.access_token);

    //     originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
    //     return api(originalRequest);
    //   } catch (refreshError) {
    //     localStorage.clear();
    //     window.location.href = "/login";
    //   }
    // }

    return Promise.reject(error);
  }
);

export default api;
