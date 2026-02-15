import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import { userProfile } from './data/mockData';

function App() {
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    if (activeTab === 'home') {
      return role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />;
    } else if (activeTab === 'courses') {
      return <Courses role={role} />;
    } else if (activeTab === 'settings') {
      return <Settings />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-[280px]">
        <Topbar role={role} setRole={setRole} userProfile={userProfile} />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
