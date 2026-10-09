import { Droplets, ShieldCheck, Hammer, Paintbrush, Wrench, ArrowRight } from 'lucide-react';
import { SERVICE_OPTIONS } from '@/types';

const SERVICE_DETAILS = [
  {
    icon: Droplets,
    title: 'Washing & Detailing',
    description: 'Showroom-quality exterior wash, interior deep clean, and paint decontamination for a flawless finish.',
    features: ['Hand wash & dry', 'Interior detailing', 'Clay bar treatment'],
  },
  {
    icon: ShieldCheck,
    title: 'PPF (Paint Protection Film)',
    description: 'Invisible armor for your paint. Self-healing film that guards against chips, scratches, and UV damage.',
    features: ['Self-healing film', 'UV resistant', '10-year warranty'],
  },
  {
    icon: Hammer,
    title: 'Denting',
    description: "Precision dent removal and panel beating to restore your vehicle's body to factory condition.",
    features: ['PDR technique', 'Panel beating', 'Frame straightening'],
  },
  {
    icon: Paintbrush,
    title: 'Painting',
    description: 'Computerized color matching and spray booth refinishing for a perfect, durable paint job.',
    features: ['Color matching', 'Spray booth finish', 'Clear coat protection'],
  },
  {
    icon: Wrench,
    title: 'Mechanical Repairs',
    description: 'Full-spectrum mechanical service from diagnostics to engine overhauls performed by certified technicians.',
    features: ['Engine diagnostics', 'Brake & suspension', 'Full inspection'],
  },
];

interface ServicesProps {
  onBookService: (service: string) => void;
}

export function Services({ onBookService }: ServicesProps) {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Services Built for Excellence
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every service is performed by certified professionals using state-of-the-art equipment.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_DETAILS.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60 hover:shadow-xl hover:ring-blue-200 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBookService(service.title)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Book this service
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}

          <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white overflow-hidden">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -right-4 -bottom-12 h-24 w-24 rounded-full bg-white/5" />
            <div className="relative">
              <h3 className="text-2xl font-bold">Not sure what you need?</h3>
              <p className="mt-3 text-sm text-blue-100 leading-relaxed">
                Bring your vehicle in for a comprehensive inspection. Our experts will recommend the
                right services for your car.
              </p>
              <button
                onClick={() => onBookService(SERVICE_OPTIONS[0])}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors active:scale-95"
              >
                Get a Free Inspection
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
