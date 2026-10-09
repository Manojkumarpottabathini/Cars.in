import { useState, type FormEvent } from 'react';
import { User, Phone, Car, Wrench, Calendar, Clock, Loader2, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SERVICE_OPTIONS, type NewBooking } from '@/types';
import { useToast } from '@/context/ToastContext';

interface BookingFormProps {
  preselectedService: string;
}

export function BookingForm({ preselectedService }: BookingFormProps) {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<NewBooking>({
    customer_name: '',
    contact_number: '',
    car_make_model: '',
    service: preselectedService,
    preferred_date: '',
    preferred_time: '',
  });

  const handleChange = (field: keyof NewBooking, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('bookings').insert(form);
      if (error) throw error;

      showToast('Booking confirmed! We will contact you shortly.', 'success');
      setForm({
        customer_name: '',
        contact_number: '',
        car_make_model: '',
        service: SERVICE_OPTIONS[0],
        preferred_date: '',
        preferred_time: '',
      });
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all';

  return (
    <section id="booking" className="bg-slate-900 py-24 relative overflow-hidden">
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Book Your Slot
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Schedule Your Service
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Fill out the form below and we will confirm your appointment within 2 hours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-2xl bg-white p-6 sm:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                value={form.customer_name}
                onChange={(e) => handleChange('customer_name', e.target.value)}
                placeholder="Full Name"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                required
                value={form.contact_number}
                onChange={(e) => handleChange('contact_number', e.target.value)}
                placeholder="Contact Number"
                className={inputClass}
              />
            </div>

            <div className="relative sm:col-span-2">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                value={form.car_make_model}
                onChange={(e) => handleChange('car_make_model', e.target.value)}
                placeholder="Car Make & Model (e.g., BMW M5, Toyota Camry)"
                className={inputClass}
              />
            </div>

            <div className="relative sm:col-span-2">
              <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                required
                value={form.service}
                onChange={(e) => handleChange('service', e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="date"
                required
                min={today}
                value={form.preferred_date}
                onChange={(e) => handleChange('preferred_date', e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="time"
                required
                value={form.preferred_time}
                onChange={(e) => handleChange('preferred_time', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Confirm Booking
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-slate-400">
            By submitting, you agree to be contacted regarding your appointment.
          </p>
        </form>
      </div>
    </section>
  );
}
