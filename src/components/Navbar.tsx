import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavigate: (page: 'home' | 'login' | 'dashboard') => void;
  currentPage: string;
  isAdmin: boolean;
}

export function Navbar({ onNavigate, currentPage, isAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'home' as const, href: '#home' },
    { label: 'Services', target: 'home' as const, href: '#services' },
    { label: 'Book a Slot', target: 'home' as const, href: '#booking' },
    { label: 'About', target: 'home' as const, href: '#about' },
  ];

  const handleNavClick = (href: string, target: 'home' | 'login' | 'dashboard') => {
    if (target === 'home' && currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <Logo />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.target)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => onNavigate(isAdmin ? 'dashboard' : 'login')}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-200 active:scale-95"
            >
              {isAdmin ? 'Dashboard' : 'Owner Login'}
            </button>
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md">
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.target)}
                  className="text-left rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate(isAdmin ? 'dashboard' : 'login');
                  setMobileOpen(false);
                }}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                {isAdmin ? 'Dashboard' : 'Owner Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
