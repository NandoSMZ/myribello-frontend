'use client';

import React, { useState, useEffect } from 'react';

interface ConstructionModalProps {
  title: string;
  message: string;
}

const ConstructionModal: React.FC<ConstructionModalProps> = ({ title, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mostrar el modal después de un pequeño retraso para mejorar la experiencia
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-black border border-amber-500 rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-amber-500 text-center mb-2">{title}</h3>
        <p className="text-white text-center mb-6">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold rounded-lg transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConstructionModal;