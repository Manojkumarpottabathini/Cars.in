import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
            error: <XCircle className="h-5 w-5 text-red-400" />,
            info: <Info className="h-5 w-5 text-blue-400" />,
          };
          const borders = {
            success: 'border-l-emerald-500',
            error: 'border-l-red-500',
            info: 'border-l-blue-500',
          };
          return (
            <div
              key={toast.id}
              className={`flex items-center gap-3 rounded-lg border-l-4 ${borders[toast.type]} bg-slate-900 px-5 py-4 shadow-2xl ring-1 ring-white/10 animate-slide-in`}
            >
              {icons[toast.type]}
              <span className="text-sm font-medium text-white pr-4">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
