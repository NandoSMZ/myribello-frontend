import React from 'react';
import toast from 'react-hot-toast';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const showConfirmation = ({
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700',
  onConfirm,
  onCancel,
}: ConfirmationOptions) => {
  const toastId = toast.custom((t) => (
    <div className={`bg-gray-900 border border-ribello-gold/30 rounded-lg p-4 shadow-lg transform transition-all duration-300 ${
      t.visible ? 'animate-in slide-in-from-top-5' : 'animate-out slide-out-to-top-5'
    }`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="text-2xl">⚠️</div>
        </div>
        <div className="flex-1">
          <h3 className="text-ribello-gold font-semibold text-lg">{title}</h3>
          <p className="text-gray-300 text-sm mt-1">{message}</p>
          
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => {
                toast.dismiss(toastId);
                onConfirm();
              }}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-colors cursor-pointer ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
            <button
              onClick={() => {
                toast.dismiss(toastId);
                onCancel?.();
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ), {
    duration: Infinity,
    position: 'top-center',
  });
};

// Funciones de conveniencia para diferentes tipos de notificaciones
export const showSuccess = (message: string, title?: string) => {
  toast.success(title ? `${title}: ${message}` : message, {
    duration: 3000,
  });
};

export const showError = (message: string, title?: string) => {
  toast.error(title ? `${title}: ${message}` : message, {
    duration: 4000,
  });
};

export const showInfo = (message: string, title?: string) => {
  toast(title ? `${title}: ${message}` : message, {
    icon: 'ℹ️',
    duration: 3000,
  });
};

export const showWarning = (message: string, title?: string) => {
  toast(title ? `${title}: ${message}` : message, {
    icon: '⚠️',
    duration: 3500,
  });
};
