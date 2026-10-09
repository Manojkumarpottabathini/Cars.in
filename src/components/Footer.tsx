import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: 'home' | 'login' | 'dashboard') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Premium car care for premium rides. Your vehicle deserves the best.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Washing & Detailing</li>
              <li>PPF (Paint Protection Film)</li>
              <li>Denting</li>
              <li>Painting</li>
              <li>Mechanical Repairs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" /> info@carsingarage.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" /> 123 Auto Boulevard, Springfield
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Mon - Fri: 8:00 AM - 7:00 PM</li>
              <li>Saturday: 9:00 AM - 5:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CARs IN. All rights reserved.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors"
          >
            <Wrench className="h-3.5 w-3.5" /> Owner Portal
          </button>
        </div>
      </div>
    </footer>
  );
}
