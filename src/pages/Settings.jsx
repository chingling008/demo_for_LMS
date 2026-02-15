import ProfileEdit from '../components/ProfileEdit';
import { userProfile } from '../data/mockData';

const Settings = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your account settings and preferences.</p>
      </div>

      <ProfileEdit userProfile={userProfile} />
    </div>
  );
};

export default Settings;
