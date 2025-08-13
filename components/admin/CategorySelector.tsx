import React from 'react';
import { Category } from '@/src/services/adminProductService';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  productCounts: Record<number, number>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  productCounts,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-lg sm:text-xl font-serif text-ribello-gold mb-3 sm:mb-4">Seleccionar Categoría</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Opción para ver todos */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
            selectedCategory === null
              ? 'border-ribello-gold bg-ribello-gold/10 text-ribello-gold'
              : 'border-ribello-gold/30 bg-gradient-to-br from-ribello-gold/10 to-black text-gray-300 hover:border-ribello-gold/50 hover:from-ribello-gold/15'
          }`}
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🍽️</div>
            <div className="font-medium text-sm sm:text-base">Todos los Productos</div>
            <div className="text-xs sm:text-sm opacity-75">
              {Object.values(productCounts).reduce((sum, count) => sum + count, 0)} productos
            </div>
          </div>
        </button>

        {/* Categorías */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedCategory === category.id
                ? 'border-ribello-gold bg-ribello-gold/10 text-ribello-gold'
                : 'border-ribello-gold/30 bg-gradient-to-br from-ribello-gold/10 to-black text-gray-300 hover:border-ribello-gold/50 hover:from-ribello-gold/15'
            }`}
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{getCategoryIcon(category.name)}</div>
              <div className="font-medium text-sm sm:text-base">{category.name}</div>
              <div className="text-xs sm:text-sm opacity-75">
                {productCounts[category.id] || 0} productos
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Función para obtener iconos según el nombre de la categoría
const getCategoryIcon = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  
  // Comidas principales
  if (name.includes('pizza')) return '🍕';
  if (name.includes('hamburguesa') || name.includes('burger')) return '🍔';
  if (name.includes('sandwich') || name.includes('sándwich')) return '🥪';
  if (name.includes('lasagna') || name.includes('lasaña')) return '🍝';
  
  // Bebidas sin alcohol
  if (name.includes('gaseosa') || name.includes('refresco') || name.includes('soda')) return '🥤';
  if (name.includes('limonada') || name.includes('limón')) return '🍋';
  if (name.includes('jugo') || name.includes('natural')) return '🧃';
  
  // Bebidas con alcohol
  if (name.includes('cerveza') || name.includes('beer')) return '🍺';
  if (name.includes('licor') || name.includes('cocktail') || name.includes('cóctel')) return '🍹';
  if (name.includes('sin licor') || name.includes('mocktail')) return '🍸';
  
  // Iconos por defecto según tipo común
  return '🍽️';
};
