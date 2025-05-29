import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Product } from '../data/bistroData';
import { formatCurrency } from '@/src/utils';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Efecto para cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevenir scroll cuando el modal está abierto
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Si no hay producto, no mostramos nada
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div 
        ref={modalRef} 
        className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-5 m-4 max-w-lg w-full border border-ribello-gold"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-ribello-gold font-serif font-bold">{product.name}</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-ribello-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative w-full h-48 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="mb-4">
          <p className="text-white">{product.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">Categoría: </span>
            <span className="text-white">{product.category}</span>
          </div>
          <div className="text-xl font-bold text-ribello-gold">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    </div>
  );
}