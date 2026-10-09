import { Calendar, ChevronRight, Star } from 'lucide-react';

const HERO_IMAGE = 'https://images.pexels.com/photos/15489246/pexels-photo-15489246.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

interface HeroProps {
  onBookClick: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Luxury car in a premium garage"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 ring-1 ring-blue-500/30 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">Premium Auto Care Since 2015</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
            Premium Care for
            <br />
            Your <span className="text-blue-400">Premium Ride</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
            From meticulous detailing to expert mechanical repairs, CARs IN delivers dealership-quality
            service with a personal touch. Book your slot today and experience the difference.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBookClick}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/40 hover:bg-blue-500 hover:shadow-blue-500/50 transition-all duration-200 active:scale-95"
            >
              <Calendar className="h-5 w-5" />
              Book a Slot
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-200"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-16 flex gap-12">
            {[
              { number: '5,000+', label: 'Cars Serviced' },
              { number: '4.9/5', label: 'Customer Rating' },
              { number: '10+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
