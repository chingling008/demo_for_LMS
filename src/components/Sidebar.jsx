import { Home, BookOpen, Settings, ClipboardList, Calendar, MessageSquare, BarChart3, Award } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, role }) => {
  const studentMenuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const teacherMenuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = role === 'teacher' ? teacherMenuItems : studentMenuItems;

  return (
    <aside className="w-[280px] min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">LMS Portal</h1>
      </div>
      
      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-xl transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
