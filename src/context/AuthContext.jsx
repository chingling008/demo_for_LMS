import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('student');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      authApi
        .getCurrentUser()
        .then((userData) => {
          setUser(userData);
          setRole(userData.role || 'student');
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    setRole(response.user.role || 'student');
    return response;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    setRole(response.user.role || 'student');
    return response;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    setRole('student');
  };

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        register,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
