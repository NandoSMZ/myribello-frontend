import React from 'react';
import Image from 'next/image';
import { Product } from '../data/bistroData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex mb-4 rounded-lg overflow-hidden bg-gradient-to-r from-amber-900/30 to-amber-800/20 border border-amber-700/40">
      <div className="relative w-1/3 h-28">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover"
        />
      </div>
      <div className="p-3 w-2/3">
        <h3 className="text-amber-500 font-serif font-bold text-lg truncate">{product.name}</h3>
        <p className="text-gray-300 text-sm line-clamp-2 mb-2">{product.description}</p>
        <p className="text-amber-400 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;