import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { Dashboard } from '@/pages/Dashboard';
import { supabase } from '@/lib/supabase';

type Page = 'home' | 'login' | 'dashboard';

function AppContent() {
  const { session, loading } = useAuth();
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    if (!loading) {
      if (page === 'login' && session) {
        setPage('dashboard');
      }
      if (page === 'dashboard' && !session) {
        setPage('login');
      }
    }
  }, [session, loading, page]);

  const handleNavigate = (target: Page) => {
    if (target === 'dashboard' && !session) {
      setPage('login');
      return;
    }
    if (target === 'login' && session) {
      setPage('dashboard');
      return;
    }
    setPage(target);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (page === 'login') {
    return <LoginPage onNavigate={handleNavigate} onLoginSuccess={() => setPage('dashboard')} />;
  }

  if (page === 'dashboard' && session) {
    return <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  return (
    <LandingPage
      onNavigate={handleNavigate}
      currentPage={page}
      isAdmin={!!session}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
