import { useState } from 'react';
import { User, Camera, Lock, Calendar } from 'lucide-react';

const ProfileEdit = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Bio', icon: User },
    { id: 'avatar', label: 'Avatar', icon: Camera },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      {/* Tabs */}
      <div className="border-b border-slate-200 px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'bio' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={userProfile.name}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={userProfile.email}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue={userProfile.bio}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar size={16} />
              <span>Member since {userProfile.joinDate}</span>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'avatar' && (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 bg-indigo-100 rounded-xl flex items-center justify-center text-6xl">
                {userProfile.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">Profile Picture</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Choose an emoji or upload an image for your profile picture
                </p>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                  <Camera size={18} />
                  Upload Image
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Choose Emoji
              </label>
              <div className="grid grid-cols-8 gap-2">
                {['👤', '👨', '👩', '🧑', '👶', '🧔', '👱', '🧓', '👴', '👵', '🙂', '😊', '😎', '🤓', '🧑‍💻', '👨‍💻'].map((emoji) => (
                  <button
                    key={emoji}
                    className="w-12 h-12 bg-slate-100 rounded-lg hover:bg-indigo-100 transition-colors text-2xl flex items-center justify-center"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-medium text-slate-900 mb-2">Password Requirements</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains at least one uppercase letter</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character</li>
              </ul>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
