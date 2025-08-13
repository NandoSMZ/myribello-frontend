import React from 'react';
import Image from 'next/image';
import { getImagePath } from '@/src/utils/utils';
import { Product } from '@/src/services/adminProductService';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-gradient-to-br from-ribello-gold/10 to-black border border-ribello-gold/30 rounded-lg p-4 hover:border-ribello-gold/50 transition-colors">
      <div className="aspect-square rounded-lg overflow-hidden mb-4 relative">
        <Image
          src={getImagePath(product.image)}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <h3 className="text-xl font-serif font-bold text-ribello-gold mb-2">
        {product.name}
      </h3>
      
      <p className="text-gray-300 text-sm mb-2 line-clamp-2">
        {product.description}
      </p>
      
      <p className="text-ribello-gold font-medium mb-2">
        ${product.price}
      </p>
      
      <p className="text-gray-400 text-sm mb-4">
        {product.category.name}
      </p>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
