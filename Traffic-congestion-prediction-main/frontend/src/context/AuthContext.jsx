import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('trafficAI_token');
    return token ? true : true; // Default authenticated for post-login experience
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('trafficAI_user');
    if (savedUser) {
      try { return JSON.parse(savedUser); } catch (e) {}
    }
    return { name: 'Traffic Engineer', email: 'engineer@trafficai.com' };
  });

  useEffect(() => {
    if (!localStorage.getItem('trafficAI_token')) {
      localStorage.setItem('trafficAI_token', 'dummy-jwt-token');
    }
    if (!localStorage.getItem('trafficAI_user')) {
      localStorage.setItem('trafficAI_user', JSON.stringify({ name: 'Traffic Engineer', email: 'engineer@trafficai.com' }));
    }
    if (!localStorage.getItem('trafficAI_history')) {
      const sampleHistory = [
        {
          id: 'PRED-9481',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          inputs: { road_name: 'Sony World Junction', area_name: 'Koramangala', weather_condition: 'Clear', roadwork: false, day_of_week: 0, month: 10 },
          result: { risk_level: 'High', congestion_probability: 0.88, label: 'High Risk (88%)' }
        },
        {
          id: 'PRED-9480',
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          inputs: { road_name: 'Sarjapur Road', area_name: 'Koramangala', weather_condition: 'Rain', roadwork: true, day_of_week: 1, month: 10 },
          result: { risk_level: 'High', congestion_probability: 0.94, label: 'High Risk (94%)' }
        },
        {
          id: 'PRED-9479',
          timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
          inputs: { road_name: '100 Feet Road', area_name: 'Indiranagar', weather_condition: 'Clear', roadwork: false, day_of_week: 5, month: 10 },
          result: { risk_level: 'Medium', congestion_probability: 0.52, label: 'Medium Risk (52%)' }
        },
        {
          id: 'PRED-9478',
          timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
          inputs: { road_name: 'Tumkur Road', area_name: 'Yeshwanthpur', weather_condition: 'Clear', roadwork: false, day_of_week: 6, month: 10 },
          result: { risk_level: 'Low', congestion_probability: 0.18, label: 'Low Risk (18%)' }
        }
      ];
      localStorage.setItem('trafficAI_history', JSON.stringify(sampleHistory));
    }
  }, []);


  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { name: email.split('@')[0].replace('.', ' '), email };
          localStorage.setItem('trafficAI_token', 'dummy-jwt-token');
          localStorage.setItem('trafficAI_user', JSON.stringify(userData));
          setIsAuthenticated(true);
          setUser(userData);
          resolve();
        } else {
          reject(new Error('Please provide email and password'));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('trafficAI_token');
    localStorage.removeItem('trafficAI_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
