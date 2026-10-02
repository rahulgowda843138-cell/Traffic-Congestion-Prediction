import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  History, 
  BarChart3, 
  User, 
  Settings, 
  HelpCircle,
  LogOut,
  BrainCircuit,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';

import clsx from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Predict Traffic', path: '/predict', icon: Activity },
  { name: 'Prediction History', path: '/history', icon: History },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, isMobile, onClose, onOpenChat }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside 
      className={clsx(
        "fixed md:static inset-y-0 left-0 z-50 flex flex-col w-64 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out text-slate-300 shadow-2xl md:shadow-none",
        !isOpen && "-translate-x-full md:translate-x-0 md:w-20 lg:w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <BrainCircuit className="w-8 h-8 text-cyan-400 shrink-0" />
          <div className={clsx("flex flex-col whitespace-nowrap transition-opacity duration-300", !isOpen && "md:opacity-0 lg:opacity-100")}>
            <span className="text-xl font-bold text-white tracking-tight">TrafficAI</span>
            <span className="text-[10px] text-slate-400 font-medium">Smart Intelligence</span>
          </div>
        </Link>
        {isMobile && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-md">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "hover:bg-slate-800/50 hover:text-white"
              )}
              title={!isOpen ? item.name : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
              <item.icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-blue-400" : "text-slate-400 group-hover:text-blue-300")} />
              <span className={clsx("font-medium whitespace-nowrap transition-opacity duration-300", !isOpen && "md:opacity-0 lg:opacity-100")}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Dedicated AI Copilot Button in Sidebar */}
        <button
          onClick={onOpenChat}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg mt-3 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-white hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-200 group relative shadow-md"
          title={!isOpen ? "AI Operations Copilot" : undefined}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className={clsx("font-semibold text-sm whitespace-nowrap transition-opacity duration-300", !isOpen && "md:opacity-0 lg:opacity-100")}>
              AI Copilot
            </span>
          </div>
          <span className={clsx("text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-cyan-400/30", !isOpen && "md:hidden lg:inline-block")}>
            LIVE
          </span>
        </button>
      </div>


      <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
        <button className={clsx(
          "flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group",
          !isOpen && "md:justify-center lg:justify-start"
        )}
        title={!isOpen ? "Help & Support" : undefined}>
          <HelpCircle className="w-5 h-5 shrink-0 group-hover:text-white" />
          <span className={clsx("whitespace-nowrap transition-opacity", !isOpen && "md:opacity-0 lg:opacity-100")}>Help & Support</span>
        </button>
        <button 
          onClick={logout}
          className={clsx(
            "flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors group",
            !isOpen && "md:justify-center lg:justify-start"
          )}
          title={!isOpen ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" />
          <span className={clsx("whitespace-nowrap transition-opacity", !isOpen && "md:opacity-0 lg:opacity-100")}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
