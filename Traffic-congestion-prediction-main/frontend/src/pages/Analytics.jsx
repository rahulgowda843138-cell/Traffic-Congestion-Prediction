import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, MapPin, CloudRain, Clock, Calendar } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const HOURLY_TRENDS = [
  { hour: '06:00', risk: 22, volume: 'Low' },
  { hour: '08:00', risk: 78, volume: 'Heavy' },
  { hour: '09:30', risk: 94, volume: 'Severe' },
  { hour: '11:00', risk: 65, volume: 'Moderate' },
  { hour: '13:00', risk: 42, volume: 'Moderate' },
  { hour: '15:00', risk: 58, volume: 'Moderate' },
  { hour: '17:30', risk: 89, volume: 'Severe' },
  { hour: '19:30', risk: 95, volume: 'Severe' },
  { hour: '21:30', risk: 48, volume: 'Light' },
];

const AREA_RISK_DATA = [
  { area: 'Koramangala', riskScore: 84, color: '#ef4444' },
  { area: 'Whitefield', riskScore: 79, color: '#f97316' },
  { area: 'Hebbal', riskScore: 72, color: '#f59e0b' },
  { area: 'Indiranagar', riskScore: 68, color: '#eab308' },
  { area: 'Yeshwanthpur', riskScore: 41, color: '#10b981' },
];

const WEATHER_IMPACT = [
  { name: 'Monsoon Rain', value: 42, color: '#3b82f6' },
  { name: 'Roadwork', value: 28, color: '#f97316' },
  { name: 'Peak Hours', value: 20, color: '#8b5cf6' },
  { name: 'Clear Weather', value: 10, color: '#10b981' },
];

export default function Analytics() {
  const [activeRange, setActiveRange] = useState('7 Days');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Traffic Analytics & Insights</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time Bengaluru arterial corridor telemetry & machine learning risk distribution.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {['Today', '7 Days', '30 Days', 'Custom'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveRange(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeRange === filter 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Congestion Index</span>
            <TrendingUp className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">74.2%</div>
          <p className="text-xs text-red-500 font-medium mt-1">↑ +4.1% vs last week</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highest Risk Corridor</span>
            <MapPin className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white truncate">Sony World Junction</div>
          <p className="text-xs text-slate-500 mt-1">Koramangala Corridor</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peak Gridlock Hour</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">09:30 AM & 07:30 PM</div>
          <p className="text-xs text-slate-500 mt-1">Commuter rush hour</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Model Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">91.4%</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">Calibrated L2 Regression</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Trend Line Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Diurnal Congestion Risk Pattern</h3>
              <p className="text-xs text-slate-500">24-hour predictive traffic risk probability curve</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_TRENDS}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val) => [`${val}% Risk Probability`, 'Congestion']}
                />
                <Area type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Weather & Environmental Drivers */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Risk Factors Contribution</h3>
            <p className="text-xs text-slate-500 mb-4">ML feature weight influence distribution</p>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WEATHER_IMPACT}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {WEATHER_IMPACT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val) => [`${val}% Weight`, 'Impact']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {WEATHER_IMPACT.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart: Area Risk Ranking */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Bengaluru Zone Risk Breakdown</h3>
        <p className="text-xs text-slate-500 mb-6">Aggregated corridor risk index across key tech hubs</p>
        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={AREA_RISK_DATA}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="area" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                formatter={(val) => [`${val}% Risk Score`, 'Congestion Risk']}
              />
              <Bar dataKey="riskScore" radius={[8, 8, 0, 0]}>
                {AREA_RISK_DATA.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
