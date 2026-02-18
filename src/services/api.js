import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || { message: 'An error occurred' });
  }
);

// Auth API
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
};

// User API
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  updatePassword: (passwordData) => api.put('/users/password', passwordData),
};

// Courses API
export const coursesApi = {
  getAll: (role) => api.get(`/courses?role=${role}`),
  getById: (id) => api.get(`/courses/${id}`),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
};

// Assignments API
export const assignmentsApi = {
  getAll: (role) => api.get(`/assignments?role=${role}`),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (assignmentData) => api.post('/assignments', assignmentData),
  update: (id, assignmentData) => api.put(`/assignments/${id}`, assignmentData),
  submit: (id, submissionData) => api.post(`/assignments/${id}/submit`, submissionData),
  grade: (id, gradeData) => api.post(`/assignments/${id}/grade`, gradeData),
};

// Grades API
export const gradesApi = {
  getAll: () => api.get('/grades'),
  getStats: () => api.get('/grades/stats'),
  getByCourse: (courseId) => api.get(`/grades/course/${courseId}`),
};

// Calendar API
export const calendarApi = {
  getEvents: (month, year) => api.get(`/calendar/events?month=${month}&year=${year}`),
  createEvent: (eventData) => api.post('/calendar/events', eventData),
  updateEvent: (id, eventData) => api.put(`/calendar/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/calendar/events/${id}`),
};

// Messages API
export const messagesApi = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId) => api.get(`/messages/conversations/${conversationId}`),
  sendMessage: (conversationId, messageData) => 
    api.post(`/messages/conversations/${conversationId}/messages`, messageData),
  createConversation: (participantId) => 
    api.post('/messages/conversations', { participantId }),
};

// Analytics API (Teacher only)
export const analyticsApi = {
  getOverview: () => api.get('/analytics/overview'),
  getEngagement: () => api.get('/analytics/engagement'),
  getTopPerformers: () => api.get('/analytics/top-performers'),
  getCoursePerformance: () => api.get('/analytics/course-performance'),
};

// Dashboard API
export const dashboardApi = {
  getTeacherStats: () => api.get('/dashboard/teacher/stats'),
  getStudentProgress: () => api.get('/dashboard/student/progress'),
  getContinueLearning: () => api.get('/dashboard/student/continue-learning'),
};

export default api;
