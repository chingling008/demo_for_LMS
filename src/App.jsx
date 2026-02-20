import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import Assignments from './pages/Assignments';
import Calendar from './pages/Calendar';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Grades from './pages/Grades';
import Login from './pages/Login';
import { userProfile } from './data/mockData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('home');

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
      case 'courses':
        return <Courses role={role} />;
      case 'assignments':
        return <Assignments role={role} />;
      case 'grades':
        return <Grades />;
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <Calendar role={role} />;
      case 'messages':
        return <Messages role={role} />;
      case 'settings':
        return <Settings />;
      default:
        return role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
      <div className="ml-[280px]">
        <Topbar 
          role={role} 
          setRole={setRole} 
          userProfile={user || userProfile} 
          onLogout={handleLogout}
        />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
