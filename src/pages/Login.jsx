import { useState } from 'react';
import { LogIn, UserPlus, GraduationCap, BookOpen } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes, create a mock user
    const demoUser = {
      name: isSignup ? formData.name : (role === 'teacher' ? 'Sarah Johnson' : 'John Doe'),
      email: isSignup ? formData.email : (role === 'teacher' ? 'teacher@lms.com' : 'student@lms.com'),
      role: role,
      avatar: role === 'teacher' ? '👨‍🏫' : '👤',
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('userRole', role);
    
    // Call the onLogin callback
    onLogin(demoUser, role);
  };

  const handleQuickDemo = (demoRole) => {
    const demoUser = {
      name: demoRole === 'teacher' ? 'Sarah Johnson' : 'John Doe',
      email: demoRole === 'teacher' ? 'teacher@lms.com' : 'student@lms.com',
      role: demoRole,
      avatar: demoRole === 'teacher' ? '👨‍🏫' : '👤',
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('userRole', demoRole);
    
    onLogin(demoUser, demoRole);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Welcome Message */}
        <div className="text-white flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to LMS Portal</h1>
            <p className="text-xl text-indigo-100">
              A comprehensive Learning Management System for students and educators
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">For Students</h3>
                <p className="text-indigo-100">Track courses, assignments, grades, and communicate with instructors</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">For Teachers</h3>
                <p className="text-indigo-100">Manage courses, grade assignments, and analyze student performance</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="font-semibold text-lg mb-3">✨ Quick Demo Access</h3>
            <p className="text-indigo-100 mb-4 text-sm">
              Try the platform instantly without creating an account
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleQuickDemo('student')}
                className="flex-1 bg-white text-indigo-600 py-3 px-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Demo as Student
              </button>
              <button
                onClick={() => handleQuickDemo('teacher')}
                className="flex-1 bg-white text-purple-600 py-3 px-4 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Demo as Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isSignup ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-slate-600">
              {isSignup ? 'Join our learning community' : 'Welcome back! Please enter your credentials'}
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === 'student'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <GraduationCap className="mx-auto mb-2" size={28} />
                <div className="font-semibold">Student</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === 'teacher'
                    ? 'border-purple-600 bg-purple-50 text-purple-600'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <BookOpen className="mx-auto mb-2" size={28} />
                <div className="font-semibold">Teacher</div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                  required={isSignup}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <button type="button" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                role === 'teacher'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSignup ? (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-slate-600 hover:text-slate-900"
            >
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <span className="text-indigo-600 font-semibold">Sign In</span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span className="text-indigo-600 font-semibold">Sign Up</span>
                </>
              )}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-600 text-center">
              <strong>Demo Credentials:</strong> Any email/password works for demo purposes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
