import { CheckCircle2, Award, Users, Clock } from 'lucide-react';

const ABOUT_IMAGE = 'https://images.pexels.com/photos/4756887/pexels-photo-4756887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={ABOUT_IMAGE}
                alt="Modern car repair shop interior"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block rounded-2xl bg-blue-600 p-6 text-white shadow-xl">
              <div className="text-3xl font-bold">100%</div>
              <div className="mt-1 text-sm text-blue-100">Satisfaction Guarantee</div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              The CARs IN Difference
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We combine cutting-edge technology with old-fashioned craftsmanship. Every car that
              rolls into our garage is treated as if it were our own.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  icon: Award,
                  title: 'Certified Technicians',
                  description: 'Our team holds industry certifications and undergoes continuous training.',
                },
                {
                  icon: Clock,
                  title: 'On-Time Delivery',
                  description: 'We respect your schedule. Your car is ready when we promise it will be.',
                },
                {
                  icon: Users,
                  title: 'Transparent Pricing',
                  description: 'No hidden fees or surprises. You approve every service before we begin.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {['Genuine Parts', 'Warranty on Repairs', 'Free Pickup & Drop', 'Digital Service Records'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
