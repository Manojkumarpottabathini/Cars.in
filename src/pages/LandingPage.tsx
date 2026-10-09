import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { BookingForm } from '@/components/BookingForm';

interface LandingPageProps {
  onNavigate: (page: 'home' | 'login' | 'dashboard') => void;
  currentPage: string;
  isAdmin: boolean;
}

export function LandingPage({ onNavigate, currentPage, isAdmin }: LandingPageProps) {
  const [selectedService, setSelectedService] = useState<string>('Washing & Detailing');

  const handleBookService = (service: string) => {
    setSelectedService(service);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={onNavigate} currentPage={currentPage} isAdmin={isAdmin} />
      <Hero onBookClick={() => handleBookService('Washing & Detailing')} />
      <Services onBookService={handleBookService} />
      <About />
      <BookingForm preselectedService={selectedService} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
