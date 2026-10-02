import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Briefcase, Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">My Profile</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{user?.name || 'Traffic Engineer'}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || 'engineer@trafficai.com'}</p>
            <span className="mt-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-800/50">
              Administrator
            </span>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" /> Personal Information
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                  <input type="text" defaultValue={user?.name ? user.name.split(' ')[0] : ''} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                  <input type="text" defaultValue={user?.name ? user.name.split(' ')[1] || '' : ''} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />

                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> Email Address</label>
                <input type="email" defaultValue={user?.email} className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> Department</label>
                <input type="text" defaultValue="Traffic Operations" className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
              </div>
              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-slate-400" /> Security
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ensure your account is using a long, random password to stay secure.</p>
            <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-700">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
