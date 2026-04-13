import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

let toastId = 0;
const listeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function emitChange() {
  listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  success: (message: string) => {
    const id = String(++toastId);
    toasts = [...toasts, { id, type: 'success', message }];
    emitChange();
    setTimeout(() => toast.dismiss(id), 4000);
  },
  error: (message: string) => {
    const id = String(++toastId);
    toasts = [...toasts, { id, type: 'error', message }];
    emitChange();
    setTimeout(() => toast.dismiss(id), 5000);
  },
  warning: (message: string) => {
    const id = String(++toastId);
    toasts = [...toasts, { id, type: 'warning', message }];
    emitChange();
    setTimeout(() => toast.dismiss(id), 4000);
  },
  info: (message: string) => {
    const id = String(++toastId);
    toasts = [...toasts, { id, type: 'info', message }];
    emitChange();
    setTimeout(() => toast.dismiss(id), 4000);
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    emitChange();
  },
};

export function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setItems);
    return () => {
      const index = listeners.indexOf(setItems);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <XCircle className="w-5 h-5 text-error" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const bgColors = {
    success: 'bg-success/10 border-success/30',
    error: 'bg-error/10 border-error/30',
    warning: 'bg-yellow-400/10 border-yellow-400/30',
    info: 'bg-blue-400/10 border-blue-400/30',
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-lg border backdrop-blur-sm shadow-lg ${bgColors[item.type]}`}
          >
            {icons[item.type]}
            <p className="text-white font-medium">{item.message}</p>
            <button
              onClick={() => toast.dismiss(item.id)}
              className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
