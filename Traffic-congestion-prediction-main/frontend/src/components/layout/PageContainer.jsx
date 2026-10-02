import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Chat from '../../Chat';
import { Sparkles } from 'lucide-react';

export default function PageContainer({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatWide, setIsChatWide] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-900 dark:text-slate-50 font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        onClose={() => setSidebarOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 relative">
        <TopNavbar toggleSidebar={toggleSidebar} onOpenChat={() => setIsChatOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Floating AI Assistant FAB Button */}
        <button 
          className="chat-fab-btn" 
          onClick={() => setIsChatOpen(true)}
          title="Open AI Operations Copilot"
        >
          <div className="fab-icon-wrapper">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="fab-pulse-ping" />
          </div>
          <span className="fab-label">AI Copilot</span>
          <span className="fab-status-badge">
            <span className="fab-live-dot" />
            LIVE
          </span>
        </button>
      </div>

      {/* AI Chatbot Drawer Overlay */}
      {isChatOpen && (
        <div 
          className="chat-drawer-overlay" 
          onClick={() => setIsChatOpen(false)}
        >
          <div 
            className={`chat-drawer-container ${isChatWide ? 'drawer-wide' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <Chat 
              apiUrl={import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'} 
              onClose={() => setIsChatOpen(false)}
              isWide={isChatWide}
              onToggleWide={() => setIsChatWide(!isChatWide)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

