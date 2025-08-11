/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Tabs from '../../components/Tabs';
import ProductSection from '../../components/ProductSection';
import ProductDetailModal from '../../components/ProductDetailModal';
import LoadingProducts from '../../components/LoadingProducts';
import Footer from '../../components/Footer';
import { Product } from '../../data/bistroData';
import { useBistroProducts } from '../../src/hooks/useProducts';

export default function BistroPage() {
  // Usar el hook personalizado para obtener datos del backend
  const { products, categories, groupedProducts, loading, error } = useBistroProducts();
  
  const [activeTab, setActiveTab] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollingToSection = useRef(false);
  const activeTabRef = useRef(activeTab);

  // Establecer la primera categoría como activa cuando se cargan los datos
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);
  
  // Actualizamos activeTabRef cuando cambia activeTab
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);
  
  // Scrollspy mejorado para actualizar la pestaña activa automáticamente al hacer scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    // Crear una función para actualizar el scroll activo
    const updateScrollSpy = () => {
      // Si estamos haciendo scroll programático a una sección, no actualizamos el tab
      if (scrollingToSection.current) {
        return;
      }
      
      // Obtener la posición actual del scroll
      const scrollPosition = window.scrollY + 90; // Ajustar offset para el header y tabs
      
      // Verificar si estamos cerca del final de la página
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      
      // Si estamos cerca del final, podemos mantener la última pestaña activa
      if (isNearBottom) {
        const lastSection = categories[categories.length - 1];
        if (activeTabRef.current !== lastSection) {
          setActiveTab(lastSection);
        }
        return;
      }
      
      // Recorremos las secciones en orden inverso (de abajo hacia arriba)
      // para encontrar la más cercana al viewport
      const sectionEntries = Object.entries(sectionRefs.current);
      let nearestSection = activeTabRef.current;
      let nearestDistance = Infinity;
      
      for (const [sectionName, sectionRef] of sectionEntries) {
        if (sectionRef) {
          const sectionTop = sectionRef.offsetTop;
          const distance = Math.abs(scrollPosition - sectionTop);
          
          // Si este elemento está más cerca del punto de visualización que el anterior
          if (distance < nearestDistance && scrollPosition >= (sectionTop - 100)) {
            nearestDistance = distance;
            nearestSection = sectionName;
          }
        }
      }
      
      // Solo actualizamos si encontramos una sección diferente a la actual
      if (nearestSection !== activeTabRef.current) {
        setActiveTab(nearestSection);
      }
    };
    
    // Debounce para evitar demasiadas actualizaciones durante el scroll
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateScrollSpy, 50);
    };
    
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Llamar a updateScrollSpy inicialmente para establecer la sección correcta
    const timeoutId = setTimeout(updateScrollSpy, 200);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      clearTimeout(scrollTimeout);
    };
  }, [categories]); // Agregamos categories como dependencia
  
  // Función para manejar el cambio de tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Marcamos que estamos haciendo un desplazamiento programático
    scrollingToSection.current = true;
    
    const element = document.getElementById(`section-${tab.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Después de completar el scroll, permitimos que el scrollspy funcione de nuevo
      setTimeout(() => {
        scrollingToSection.current = false;
      }, 1000); // Tiempo suficiente para que termine la animación de scroll
    } else {
      scrollingToSection.current = false;
    }
  };

  // Función para manejar el clic en un producto
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Elementos fijos en la parte superior */}
      <div className="fixed top-0 left-0 right-0 z-30 flex flex-col bg-black">
        {/* Cabecera con botón de regreso */}
        <header className="p-4 flex items-center">
          <Link href="/" className="text-ribello-gold hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-ribello-gold text-xl font-serif font-bold ml-4">BISTRO</h1>
        </header>

        {/* Barra de navegación principal */}
        <Tabs 
          tabs={categories} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
        />
      </div>

      {/* Espacio para compensar los elementos fijos */}
      <div className="h-[106px]"></div>

      {/* Contenido principal */}
      <main className="flex-1 p-4 pt-6">
        {loading ? (
          <LoadingProducts message="Cargando menú bistro..." />
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">Error: {error}</div>
          </div>
        ) : (
          <>
            {Object.entries(groupedProducts).map(([categoryName, products]) => (
              <ProductSection 
                key={categoryName}
                title={categoryName} 
                products={products}
                setActiveTab={setActiveTab}
                observerRefs={sectionRefs}
                onProductClick={handleProductClick}
              />
            ))}
          </>
        )}
      </main>

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={closeModal} 
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}