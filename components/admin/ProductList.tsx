import React from 'react';
import Image from 'next/image';
import { Product } from '@/src/services/adminProductService';
import { Switch } from '@/components/ui/Switch';
import { formatCurrency, getImagePath } from '@/src/utils/utils';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  onToggleStatus: (productId: number, status: boolean) => void;
  togglingProducts?: Set<number>;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStatus,
  togglingProducts = new Set(),
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No hay productos en esta categoría</div>
        <div className="text-gray-500 text-sm">Agrega productos usando el botón &quot;Nuevo Producto&quot;</div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gradient-to-r from-ribello-gold/10 to-black rounded-lg p-3 sm:p-4 border border-ribello-gold/30 hover:border-ribello-gold/50 hover:from-ribello-gold/15 transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Imagen del producto */}
            <div className="w-full sm:w-16 h-32 sm:h-16 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getImagePath(product.image)}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 64px"
              />
            </div>

            {/* Información del producto */}
            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-medium text-white truncate">{product.name}</h3>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mt-1">{product.description}</p>
              <div className="flex items-center justify-between sm:justify-start sm:space-x-4 mt-2">
                <span className="text-ribello-gold font-medium text-lg">{formatCurrency(product.price)}</span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  ID: {product.id}
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center space-x-3 w-full sm:w-auto sm:flex-shrink-0">
              {/* Switch de Status con Badge */}
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full text-center whitespace-nowrap ${
                  product.status 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {product.status ? 'Activo' : 'Inactivo'}
                </span>
                <Switch
                  checked={product.status}
                  onChange={(checked) => onToggleStatus(product.id, checked)}
                  disabled={togglingProducts.has(product.id)}
                  size="sm"
                />
              </div>
              
              {/* Botones de acción */}
              <div className="flex space-x-2 flex-1">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
