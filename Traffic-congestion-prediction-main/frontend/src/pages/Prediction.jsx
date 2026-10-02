import { useState, useEffect } from 'react';
import { MapPin, CloudRain, CalendarDays, Clock, Activity, AlertCircle, RefreshCw, BarChart2, Zap } from 'lucide-react';
import { getOptions, getPrediction } from '../services/api';
import clsx from 'clsx';

export default function Prediction() {
  const [optionsData, setOptionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    road_name: 'Sony World Junction',
    area_name: 'Koramangala',
    weather_condition: 'Clear',
    roadwork: false,
    day_of_week: 0,
    month: 10,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getOptions();
        setOptionsData(data);
      } catch (err) {
        console.error('Failed to load options:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    if (name === 'day_of_week' || name === 'month') {
      newValue = parseInt(newValue, 10);
    }
    
    if (name === 'road_name' && optionsData) {
      // Auto-update area based on road
      const area = optionsData.road_to_area[newValue];
      setFormData(prev => ({ ...prev, [name]: newValue, area_name: area || prev.area_name }));
    } else {
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };

  const handlePredict = async (e) => {
    e?.preventDefault();
    setPredicting(true);
    setError('');
    
    try {
      const data = await getPrediction(formData);
      setResult(data);
      
      // Save to local history
      try {
        const history = JSON.parse(localStorage.getItem('trafficAI_history') || '[]');
        const newEntry = {
          id: `PRD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          timestamp: new Date().toISOString(),
          inputs: formData,
          result: data
        };
        localStorage.setItem('trafficAI_history', JSON.stringify([newEntry, ...history]));
      } catch (e) {
        console.error("Could not save history", e);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setPredicting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      road_name: optionsData?.roads[0] || 'Sony World Junction',
      area_name: optionsData?.areas[0] || 'Koramangala',
      weather_condition: 'Clear',
      roadwork: false,
      day_of_week: 0,
      month: 10,
    });
    setResult(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-slate-500">Loading prediction options...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Traffic Congestion Prediction</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Enter traffic conditions to estimate congestion risk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: FORM */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handlePredict} className="glass-panel p-6 rounded-2xl">
            
            {/* Traffic Info */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Road Name</label>
                  <select 
                    name="road_name" 
                    value={formData.road_name} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  >
                    {optionsData?.roads.map(road => (
                      <option key={road} value={road}>{road}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Area</label>
                  <select 
                    name="area_name" 
                    value={formData.area_name} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white cursor-not-allowed opacity-80"
                    disabled
                  >
                    {optionsData?.areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CloudRain className="w-4 h-4" /> Environmental Conditions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weather</label>
                  <select 
                    name="weather_condition" 
                    value={formData.weather_condition} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {optionsData?.weather_conditions.map(weather => (
                      <option key={weather} value={weather}>{weather}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name="roadwork" 
                        checked={formData.roadwork} 
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Active Roadwork / Construction
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Time Info */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Temporal Factors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Day of Week</label>
                  <select 
                    name="day_of_week" 
                    value={formData.day_of_week} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {optionsData?.day_of_week_options.map(day => (
                      <option key={day.value} value={day.value}>{day.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Month</label>
                  <select 
                    name="month" 
                    value={formData.month} 
                    onChange={handleChange}
                    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {optionsData?.months.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-3 border border-red-200 dark:border-red-800/30">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="submit" 
                disabled={predicting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                {predicting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing Traffic...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-blue-200 group-hover:text-yellow-300 transition-colors" /> Predict Congestion
                  </>
                )}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
              </button>
              
              <button 
                type="button" 
                onClick={resetForm}
                disabled={predicting}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT: RESULT */}
        <div className="lg:col-span-5 h-full">
          {result ? (
            <div className="glass-panel rounded-2xl p-6 h-full flex flex-col border-t-4 border-blue-500 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Traffic Analysis Result</h3>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-800/50">
                  Completed
                </span>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2 uppercase tracking-widest">Congestion Level</div>
                <div className={clsx(
                  "text-5xl font-extrabold tracking-tight mb-2 drop-shadow-sm",
                  result.risk_level === 'High' ? "text-red-500" :
                  result.risk_level === 'Medium' ? "text-amber-500" : "text-emerald-500"
                )}>
                  {result.label.toUpperCase()}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Activity className="w-4 h-4" /> 
                  <span className="font-semibold">{(result.congestion_probability * 100).toFixed(1)}%</span> probability
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  <span>LOW</span>
                  <span>MEDIUM</span>
                  <span>HIGH</span>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 opacity-30"></div>
                  <div 
                    className={clsx(
                      "h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                      result.risk_level === 'High' ? "bg-red-500" :
                      result.risk_level === 'Medium' ? "bg-amber-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${Math.max(5, result.congestion_probability * 100)}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6 flex-1">
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Recommendation</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200/80 leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">Why this prediction?</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Prediction generated from the provided traffic conditions using <span className="font-medium text-slate-800 dark:text-slate-200">Logistic Regression</span>.</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block text-slate-400">Est. Speed</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{result.estimated_speed_kmh} km/h</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Queue Delay</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{result.estimated_delay_min} mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="w-10 h-10 text-blue-400 dark:text-blue-500 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">No Prediction Yet</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs text-sm">
                Adjust the parameters on the left and click "Predict Congestion" to see the intelligent analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
