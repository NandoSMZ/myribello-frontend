import React from 'react';

interface LoadingProductsProps {
  message?: string;
}

export default function LoadingProducts({ message = "Cargando productos..." }: LoadingProductsProps) {
  return (
    <div className="flex flex-col justify-center items-center h-64 py-8">
      {/* Animación de platos giratorios */}
      <div className="relative mb-6">
        {/* Plato exterior */}
        <div className="w-16 h-16 border-4 border-ribello-gold/30 border-t-ribello-gold rounded-full animate-spin"></div>
        
        {/* Plato interior - gira en dirección opuesta usando duration más lenta */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-ribello-gold/50 border-b-ribello-gold border-r-transparent border-l-transparent border-t-transparent rounded-full animate-spin duration-700"></div>
        
        {/* Punto central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-ribello-gold rounded-full animate-pulse"></div>
      </div>

      {/* Texto de carga */}
      <div className="text-center">
        <h3 className="text-ribello-gold text-lg font-serif font-bold mb-2">{message}</h3>
        <p className="text-gray-300 text-sm">Preparando el menú para ti...</p>
      </div>

      {/* Indicadores de puntos animados */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-ribello-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-ribello-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-ribello-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
