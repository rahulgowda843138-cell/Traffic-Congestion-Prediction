import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Layout
import PageContainer from './components/layout/PageContainer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 30, background: '#0f172a', color: '#f8fafc', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2 style={{ color: '#ef4444', fontSize: 22, marginBottom: 10 }}>⚠️ React Application Error</h2>
          <p style={{ color: '#cbd5e1', marginBottom: 20 }}>An unexpected error occurred during rendering:</p>
          <pre style={{ background: '#1e293b', padding: 15, borderRadius: 8, color: '#fca5a5', overflowX: 'auto', fontSize: 13 }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          {this.state.errorInfo && (
            <pre style={{ background: '#1e293b', padding: 15, borderRadius: 8, color: '#94a3b8', overflowX: 'auto', fontSize: 12, marginTop: 10 }}>
              {this.state.errorInfo.componentStack}
            </pre>
          )}
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: 20, padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <PageContainer>{children}</PageContainer>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/predict" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}