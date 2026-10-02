import { useState, useEffect } from 'react';
import { Search, Filter, History as HistoryIcon, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      // Check for local storage history if backend has no /history endpoint yet
      const savedHistory = JSON.parse(localStorage.getItem('trafficAI_history') || '[]');
      setHistory(savedHistory);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500">Loading prediction history...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Prediction History</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review your previous traffic predictions.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative relative-group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
            />
          </div>
          <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-blue-500 hover:border-blue-500 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <HistoryIcon className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">No Predictions Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
            Run your first traffic prediction to see your results here.
          </p>
          <Link 
            to="/predict" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            Make Prediction
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium">
                <tr>
                  <th className="px-6 py-4">Prediction ID</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Road Name</th>
                  <th className="px-6 py-4">Traffic Level</th>
                  <th className="px-6 py-4">Probability</th>
                  <th className="px-6 py-4">Model</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{new Date(item.timestamp).toLocaleDateString()}</div>
                      <div className="text-xs">{new Date(item.timestamp).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4">{item.inputs.road_name}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${item.result.risk_level === 'High' ? 'text-red-500' : item.result.risk_level === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {item.result.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">{(item.result.congestion_probability * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4">Logistic Regression</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">Showing {history.length} results</span>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50" disabled><ChevronLeft className="w-5 h-5" /></button>
              <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50" disabled><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
