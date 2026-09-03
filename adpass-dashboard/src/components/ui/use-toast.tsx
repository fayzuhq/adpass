"use client";

import { useState, useEffect, useCallback } from 'react';

type ToastType = 'success' | 'error';

interface ToastOptions {
  message: string;
  type?: ToastType;
}

interface Toast extends ToastOptions {
  id: number;
}

let toastIdCount = 0;
let addToastFn: ((toast: Toast) => void) | null = null;

export const toast = ({ message, type = 'success' }: ToastOptions) => {
  if (addToastFn) {
    addToastFn({ id: ++toastIdCount, message, type });
  }
};

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2 bg-[#0D0E15] border border-white/10 px-4 py-3 rounded-lg shadow-xl animate-in slide-in-from-right-5 fade-in duration-300"
        >
          {t.type === 'success' ? (
            <div className="w-2 h-2 rounded-full bg-green-500" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-red-500" />
          )}
          <span className="text-sm font-medium text-white">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
