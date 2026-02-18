import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (name, email, password, role) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export const courseService = {
  getCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  enrollCourse: async (id) => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  },
};

export const assignmentService = {
  getAssignments: async () => {
    const response = await api.get('/assignments');
    return response.data;
  },

  getAssignment: async (id) => {
    const response = await api.get(`/assignments/${id}`);
    return response.data;
  },

  createAssignment: async (assignmentData) => {
    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },

  submitAssignment: async (id, content, fileUrl) => {
    const response = await api.post(`/assignments/${id}/submit`, { content, fileUrl });
    return response.data;
  },

  gradeSubmission: async (assignmentId, submissionId, grade, feedback) => {
    const response = await api.put(`/assignments/${assignmentId}/submissions/${submissionId}/grade`, {
      grade,
      feedback,
    });
    return response.data;
  },
};

export const gradeService = {
  getGrades: async () => {
    const response = await api.get('/grades');
    return response.data;
  },

  getCourseGrades: async (courseId) => {
    const response = await api.get(`/grades/course/${courseId}`);
    return response.data;
  },

  createGrade: async (gradeData) => {
    const response = await api.post('/grades', gradeData);
    return response.data;
  },
};

export const messageService = {
  getConversations: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  getConversation: async (conversationId) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  },

  sendMessage: async (recipientId, message) => {
    const response = await api.post('/messages', { recipientId, message });
    return response.data;
  },

  sendMessageInConversation: async (conversationId, text) => {
    const response = await api.post(`/messages/${conversationId}/message`, { text });
    return response.data;
  },
};

export const calendarService = {
  getEvents: async (startDate, endDate) => {
    const response = await api.get('/calendar', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/calendar/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/calendar', eventData);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/calendar/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/calendar/${id}`);
    return response.data;
  },
};

export const analyticsService = {
  getAnalytics: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },

  getCourseAnalytics: async (courseId) => {
    const response = await api.get(`/analytics/course/${courseId}`);
    return response.data;
  },
};

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  updatePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/users/password', { currentPassword, newPassword });
    return response.data;
  },

  searchUsers: async (query, role) => {
    const response = await api.get('/users/search', {
      params: { query, role },
    });
    return response.data;
  },
};
