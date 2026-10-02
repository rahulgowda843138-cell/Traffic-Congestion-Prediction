import { useState } from 'react';
import { Monitor, Bell, Shield, Globe, Trash2, CheckCircle2, Save } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  // Notifications State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Security State
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Regional State
  const [city, setCity] = useState('Bengaluru');
  const [units, setUnits] = useState('Metric (km/h)');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your application preferences & system environment.</p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-full animate-bounce">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="md:col-span-1 space-y-1">
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 font-medium rounded-xl transition-all ${
              activeTab === 'appearance' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Monitor className="w-5 h-5" /> Appearance
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 font-medium rounded-xl transition-all ${
              activeTab === 'notifications' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 font-medium rounded-xl transition-all ${
              activeTab === 'security' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-5 h-5" /> Security
          </button>

          <button 
            onClick={() => setActiveTab('regional')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 font-medium rounded-xl transition-all ${
              activeTab === 'regional' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-5 h-5" /> Regional
          </button>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'appearance' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Appearance & Theme
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Select Interface Theme</label>
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
                    onClick={() => {
                      setTheme('light');
                      document.documentElement.classList.remove('dark');
                    }}
                  >
                    <div className="w-full h-20 bg-slate-100 rounded-lg border border-slate-200 mb-2 overflow-hidden flex flex-col">
                      <div className="h-4 bg-white border-b border-slate-200 w-full"></div>
                      <div className="flex-1 p-2 flex gap-2">
                        <div className="w-1/3 h-full bg-slate-200 rounded"></div>
                        <div className="w-2/3 h-full bg-slate-200 rounded"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center text-slate-700 dark:text-slate-300">Light Theme</p>
                  </div>

                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
                    onClick={() => {
                      setTheme('dark');
                      document.documentElement.classList.add('dark');
                    }}
                  >
                    <div className="w-full h-20 bg-slate-800 rounded-lg border border-slate-700 mb-2 overflow-hidden flex flex-col">
                      <div className="h-4 bg-slate-900 border-b border-slate-700 w-full"></div>
                      <div className="flex-1 p-2 flex gap-2">
                        <div className="w-1/3 h-full bg-slate-700 rounded"></div>
                        <div className="w-2/3 h-full bg-slate-700 rounded"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-center text-slate-700 dark:text-slate-300">Dark Mode</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">Clear Local Storage</p>
                  <p className="text-xs text-slate-500">Reset local predictions and cached history</p>
                </div>
                <button 
                  onClick={() => {
                    localStorage.removeItem('trafficAI_history');
                    alert('Prediction history cleared.');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Clear History
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">High Risk Traffic Alerts</p>
                    <p className="text-xs text-slate-500">Receive instant push notifications when road risk exceeds 80%</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={highRiskAlerts} 
                    onChange={(e) => setHighRiskAlerts(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">Email Reports</p>
                    <p className="text-xs text-slate-500">Receive daily traffic telemetry summaries via email</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={emailAlerts} 
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">Weekly Commute Digest</p>
                    <p className="text-xs text-slate-500">Get a weekly summary of congestion hotspots across Bengaluru</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={weeklyDigest} 
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Security & Authentication
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-sm text-slate-800 dark:text-slate-200">Two-Factor Authentication (2FA)</p>
                    <p className="text-xs text-slate-500">Add an extra layer of security using an authenticator app</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={twoFactor} 
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Session Inactivity Timeout</label>
                  <select 
                    value={sessionTimeout} 
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full sm:w-64 p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="60">1 Hour</option>
                    <option value="240">4 Hours</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" /> Save Security Settings
              </button>
            </div>
          )}

          {activeTab === 'regional' && (
            <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
                Regional & Units Settings
              </h3>

              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Primary Monitored Region</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Speed Units</label>
                  <select 
                    value={units} 
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Metric (km/h)">Metric (km/h)</option>
                    <option value="Imperial (mph)">Imperial (mph)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
              >
                <Save className="w-4 h-4" /> Save Regional Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
