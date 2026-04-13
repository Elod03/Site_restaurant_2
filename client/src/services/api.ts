import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('admin');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/password', { currentPassword, newPassword }),
};

// Reservations API
export const reservationsApi = {
  getAll: (params?: { status?: string; date?: string; page?: number; limit?: number }) =>
    api.get('/reservations', { params }),
  getById: (id: number) => api.get(`/reservations/${id}`),
  getByDate: (date: string) => api.get(`/reservations/date/${date}`),
  create: (data: any) => api.post('/reservations', data),
  update: (id: number, data: any) => api.put(`/reservations/${id}`, data),
  delete: (id: number) => api.delete(`/reservations/${id}`),
  getStats: () => api.get('/reservations/stats/today'),
};

// Menus API
export const menusApi = {
  getAll: (params?: { category?: string; featured?: boolean; available?: boolean }) =>
    api.get('/menus', { params }),
  getById: (id: number) => api.get(`/menus/${id}`),
  getByCategory: (category: string) => api.get(`/menus/category/${category}`),
  create: (data: any) => api.post('/menus', data),
  update: (id: number, data: any) => api.put(`/menus/${id}`, data),
  delete: (id: number) => api.delete(`/menus/${id}`),
  toggleFeatured: (id: number) => api.patch(`/menus/${id}/featured`),
  toggleAvailability: (id: number) => api.patch(`/menus/${id}/availability`),
};

// Gallery API
export const galleryApi = {
  getAll: (params?: { category?: string }) => api.get('/gallery', { params }),
  getById: (id: number) => api.get(`/gallery/${id}`),
  upload: (formData: FormData) =>
    api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: number, data: any) => api.put(`/gallery/${id}`, data),
  delete: (id: number) => api.delete(`/gallery/${id}`),
  reorder: (items: { id: number; order: number }[]) =>
    api.post('/gallery/reorder', { items }),
};

// Settings API
export const settingsApi = {
  getAll: () => api.get('/settings'),
  getByKey: (key: string) => api.get(`/settings/${key}`),
  update: (key: string, value: string) => api.put(`/settings/${key}`, { value }),
  bulkUpdate: (settings: Record<string, string>) => api.put('/settings', { settings }),
};
