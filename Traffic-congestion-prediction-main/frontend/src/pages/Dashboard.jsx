import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Activity, Car, AlertTriangle, BrainCircuit, ArrowRight } from 'lucide-react';
import { checkHealth, getScenarios } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [health, setHealth] = useState({ status: 'checking' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const healthData = await checkHealth();
        setHealth(healthData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { title: 'Traffic Predictions', value: '1,248', desc: 'Total predictions this week', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Roads Monitored', value: health.roads_monitored || '--', desc: 'Active corridors', icon: Car, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { title: 'Congestion Risk', value: 'High', desc: 'Current peak time risk', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { title: 'ML Model', value: health.status === 'healthy' ? 'Ready' : 'Unknown', desc: health.model || 'System offline', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Good Morning, {user?.name ? user.name.split(' ')[0] : 'User'} 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Monitor traffic conditions and generate intelligent congestion predictions.
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm w-fit">
          <span className={`w-2 h-2 rounded-full ${health.status === 'healthy' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></span>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            {health.status === 'healthy' ? 'ML System Active' : 'System Offline'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl hover-card flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.title}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                {loading ? (
                  <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                ) : (
                  <span className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{stat.value}</span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Action Card */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-center">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md rounded-full text-xs font-medium mb-4">
                <BrainCircuit className="w-3.5 h-3.5" />
                Powered by Logistic Regression
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Traffic Prediction</h2>
              <p className="text-blue-100 max-w-md mb-6 leading-relaxed">
                Analyze current traffic conditions using machine learning to predict congestion risk across Bengaluru corridors.
              </p>
              
              <button 
                onClick={() => navigate('/predict')}
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 hover:gap-3 px-6 py-3 rounded-xl font-medium transition-all shadow-md group"
              >
                Predict Traffic
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Status */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center justify-between">
              Current Traffic Status
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </h3>
            
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all duration-1000 ease-out"
                    strokeDasharray="75, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-red-500">HIGH</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Risk Level</span>
                </div>
              </div>
              
              <div className="w-full mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Peak Corridors</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Koramangala, Hebbal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Avg Speed</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">12 km/h</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-2.5 mt-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors">
              View Live Map
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
