/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../data/bistroData';

interface ProductSectionProps {
  title: string;
  products: Product[];
  setActiveTab: (tab: string) => void;
  observerRefs?: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  products, 
  setActiveTab,
  observerRefs 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Registrar la referencia para el scrollspy
    if (observerRefs && sectionRef.current) {
      observerRefs.current[title] = sectionRef.current;
    }
    
    return () => {
      // Limpiar la referencia cuando el componente se desmonte
      if (observerRefs) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRefs.current[title] = null;
      }
    };
  }, [title, observerRefs]);

  return (
    <div 
      ref={sectionRef} 
      id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`} 
      className="mb-12 scroll-mt-20" // scroll-mt-20 añade margen superior al hacer scroll
    >
      <h2 className="text-2xl text-amber-500 font-serif font-bold border-b border-amber-700/30 pb-2 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;