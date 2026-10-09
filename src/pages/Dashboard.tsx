import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Logo } from '@/components/Logo';
import { STATUS_OPTIONS, type Booking, type BookingStatus } from '@/types';
import {
  LogOut,
  Search,
  Calendar,
  Phone,
  User,
  Car,
  Wrench,
  Clock,
  Inbox,
  CheckCircle2,
  Loader2,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: 'home' | 'login' | 'dashboard') => void;
  onLogout: () => void;
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-700 ring-amber-200',
  confirmed: 'bg-blue-100 text-blue-700 ring-blue-200',
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  cancelled: 'bg-red-100 text-red-700 ring-red-200',
};

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const { session } = useAuth();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('Failed to load bookings.', 'error');
    } else if (data) {
      setBookings(data as Booking[]);
    }
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      showToast('Failed to update status.', 'error');
    } else {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      showToast('Status updated successfully.', 'success');
    }
    setUpdatingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast('Signed out successfully.', 'info');
    onLogout();
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.contact_number.includes(searchQuery) ||
      b.car_make_model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
  });
  };

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-slate-900 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => onNavigate('home')}>
                <Logo />
              </button>
              <span className="hidden sm:flex items-center gap-2 rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-500/30">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-slate-400">
                {session?.user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Bookings', value: stats.total, icon: Inbox, color: 'text-blue-600 bg-blue-50' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600 bg-amber-50' },
            { label: 'Confirmed', value: stats.confirmed, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table section */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 overflow-hidden">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Booking Management</h2>
                <p className="mt-1 text-sm text-slate-500">View and manage all customer bookings</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, car..."
                    className="w-full sm:w-64 rounded-lg border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="all">All Status</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={fetchBookings}
                  className="flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all"
                  title="Refresh"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Inbox className="h-12 w-12 text-slate-300" />
              <p className="mt-4 text-slate-500 font-medium">No bookings found</p>
              <p className="mt-1 text-sm text-slate-400">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'New bookings will appear here.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> Date & Time
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" /> Customer
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" /> Contact
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Car className="h-3.5 w-3.5" /> Car Details
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Wrench className="h-3.5 w-3.5" /> Service
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {formatDate(booking.preferred_date)}
                          </div>
                          <div className="text-xs text-slate-500">{formatTime(booking.preferred_time)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">{booking.customer_name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{booking.contact_number}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{booking.car_make_model}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600">{booking.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative inline-block">
                            {updatingId === booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            ) : (
                              <select
                                value={booking.status}
                                onChange={(e) =>
                                  handleStatusChange(booking.id, e.target.value as BookingStatus)
                                }
                                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${STATUS_STYLES[booking.status]} focus:outline-none focus:ring-2 focus:ring-blue-500/30 border-0 appearance-none pr-7`}
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="lg:hidden divide-y divide-slate-100">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-slate-900">{booking.customer_name}</div>
                        <div className="text-sm text-slate-500">{booking.car_make_model}</div>
                      </div>
                      {updatingId === booking.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      ) : (
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking.id, e.target.value as BookingStatus)
                          }
                          className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${STATUS_STYLES[booking.status]} focus:outline-none border-0 appearance-none`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-400">Date:</span>{' '}
                        <span className="text-slate-700">{formatDate(booking.preferred_date)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Time:</span>{' '}
                        <span className="text-slate-700">{formatTime(booking.preferred_time)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Phone:</span>{' '}
                        <span className="text-slate-700">{booking.contact_number}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Service:</span>{' '}
                        <span className="text-slate-700">{booking.service}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
