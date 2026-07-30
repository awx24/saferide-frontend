import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sr_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sr_token');
      localStorage.removeItem('sr_user');
    }
    return Promise.reject(err);
  }
);

/* ── Auth ── */
export const login    = (data)     => api.post('/auth/login', data);
export const register = (data)     => api.post('/auth/register', data);
export const getMe    = ()         => api.get('/auth/me');

/* ── Drivers ── */
export const getDrivers          = ()     => api.get('/drivers');
export const getDriver           = (id)   => api.get(`/drivers/${id}`);
export const registerDriver      = (data) => api.post('/drivers', data);
export const getDriverRegistrations = ()  => api.get('/drivers/registrations/all');

/* ── Students ── */
export const getStudents  = ()     => api.get('/students');
export const addStudent   = (data) => api.post('/students', data);

/* ── Attendance ── */
export const getAttendance  = ()          => api.get('/attendance');
export const markAttendance = (id, status) => api.patch(`/attendance/${id}`, { status });

/* ── Vans ── */
export const getLiveVans = ()   => api.get('/vans/live');
export const getLiveVan  = (id) => api.get(`/vans/live/${id}`);

export const apiHealth = () => api.get('/health');

export default api;
