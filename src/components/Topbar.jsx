import { Search, User, Bell } from 'lucide-react';

const Topbar = ({ role, setRole, userProfile }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 ml-[280px]">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-1">
            <button
              onClick={() => setRole('student')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                role === 'student'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                role === 'teacher'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teacher
            </button>
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors relative">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{userProfile.name}</p>
              <p className="text-xs text-slate-500 capitalize">{role}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">
              {userProfile.avatar}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
