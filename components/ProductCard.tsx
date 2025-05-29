import React from 'react';
import Image from 'next/image';
import { Product } from '../data/bistroData';
import { CocktailProduct } from '../data/cocktailsData';
import { formatCurrency } from '@/src/utils';

interface ProductCardProps {
  product: Product | CocktailProduct;
  onClick?: (product: Product | CocktailProduct) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Verificar si el producto es un cóctel (tiene la propiedad hasAlcohol)
  const isCocktail = 'hasAlcohol' in product;

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div 
      className={`flex mb-4 rounded-lg overflow-hidden bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-ribello-gold/30 ${onClick ? 'cursor-pointer hover:border-ribello-gold hover:shadow-md hover:shadow-ribello-gold/20 transition-all' : ''}`}
      onClick={handleCardClick}
    >
      <div className="relative w-1/3 min-h-[112px] h-28">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 33vw, 150px"
          className="object-contain" 
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="p-3 w-2/3">
        <h3 className="text-ribello-gold font-serif font-bold text-lg truncate">{product.name}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 mb-2">{product.description}</p>
        
        {/* Solo mostrar precio para productos que no son cócteles */}
        {!isCocktail && 'price' in product && (
          <p className="text-ribello-gold font-bold">{formatCurrency(product.price)}</p>
        )}
      </div>
    </div>
  );
}