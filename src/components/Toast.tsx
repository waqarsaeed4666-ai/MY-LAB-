import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ToastState } from '../types';

interface ToastProps {
  toast: ToastState | null;
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-5 z-50 max-w-xs sm:max-w-sm bg-navy-900 text-white border border-teal-500/40 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium"
    >
      {toast.isError ? (
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
      )}
      <span>{toast.message}</span>
    </div>
  );
}
