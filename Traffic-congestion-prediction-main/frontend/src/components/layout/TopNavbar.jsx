import { useState, useEffect } from 'react';
import { Menu, Bell, Moon, Sun, User as UserIcon, LogOut, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

import { useLocation } from 'react-router-dom';

export default function TopNavbar({ toggleSidebar, onOpenChat }) {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState('light');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/predict')) return 'Predict Traffic';
    if (path.startsWith('/history')) return 'Prediction History';
    if (path.startsWith('/analytics')) return 'Analytics';
    if (path.startsWith('/profile')) return 'Profile';
    if (path.startsWith('/settings')) return 'Settings';
    return 'TrafficAI';
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-30 sticky top-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100 hidden sm:block tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* AI Copilot Quick Launch Button */}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-sm hover:from-blue-500 hover:to-indigo-500 transition-all hover:shadow-md"
          title="Open AI Operations Copilot"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span className="hidden md:inline">AI Copilot</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</h3>
                <span className="text-xs text-blue-500 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <div className="bg-slate-100 dark:bg-slate-700/50 rounded-lg p-3 mb-2 flex items-start gap-3 text-left">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">New prediction completed</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">High congestion detected at Sony World Junction.</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 mt-2">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden sm:block">
              {user?.name || 'User'}
            </span>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-1">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
              </div>
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <UserIcon className="w-4 h-4" /> Profile
              </a>
              <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <Settings className="w-4 h-4" /> Settings
              </a>
              <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
