import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('edu_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('edu_token');
      localStorage.removeItem('edu_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me:    () => api.get('/auth/me'),
};

export const studentsAPI = {
  list:   (params) => api.get('/students', { params }),
  get:    (id)     => api.get(`/students/${id}`),
  create: (data)   => api.post('/students', data),
  update: (id, d)  => api.put(`/students/${id}`, d),
  delete: (id)     => api.delete(`/students/${id}`),
};

export const teachersAPI = {
  list:   ()     => api.get('/teachers'),
  get:    (id)   => api.get(`/teachers/${id}`),
  create: (data) => api.post('/teachers', data),
};

export const batchesAPI = {
  list: () => api.get('/batches'),
};

export const attendanceAPI = {
  list:  (params) => api.get('/attendance', { params }),
  bulk:  (data)   => api.post('/attendance/bulk', data),
  stats: (params) => api.get('/attendance/stats', { params }),
};

export const feesAPI = {
  list:      (params) => api.get('/fees', { params }),
  create:    (data)   => api.post('/fees', data),
  dashboard: ()       => api.get('/fees/dashboard'),
};

export const testsAPI = {
  list:    (params) => api.get('/tests', { params }),
  results: (id)     => api.get(`/tests/${id}/results`),
  create:  (data)   => api.post('/tests', data),
};

export const assignmentsAPI = {
  list:   (params) => api.get('/assignments', { params }),
  create: (data)   => api.post('/assignments', data),
};

export const analyticsAPI = {
  dashboard:   ()       => api.get('/analytics/dashboard'),
  performance: (params) => api.get('/analytics/performance', { params }),
  heatmap:     (params) => api.get('/analytics/heatmap', { params }),
};

export const aiAPI = {
  chat:            (message)    => api.post('/ai/chat', { message }),
  predictRank:     (data)       => api.post('/ai/predict-rank', data),
  recommendations: (student_id) => api.get(`/ai/recommendations/${student_id}`),
};

export const messagesAPI = {
  list: ()     => api.get('/messages'),
  send: (data) => api.post('/messages', data),
  read: (id)   => api.put(`/messages/${id}/read`),
};

export default api;
