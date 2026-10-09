export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customer_name: string;
  contact_number: string;
  car_make_model: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: BookingStatus;
  created_at: string;
}

export interface NewBooking {
  customer_name: string;
  contact_number: string;
  car_make_model: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
}

export const SERVICE_OPTIONS = [
  'Washing & Detailing',
  'PPF (Paint Protection Film)',
  'Denting',
  'Painting',
  'Mechanical Repairs',
] as const;

export const STATUS_OPTIONS: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];
