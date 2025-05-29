'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Tabs from '../../components/Tabs';
import ProductSection from '../../components/ProductSection';
import Footer from '../../components/Footer';
import { 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allCocktailsProducts, 
  cocktailsCategorias,
  cocktailsConLicor,
  cocktailsSinLicor,
  tamanosDisponibles
} from '../../data/cocktailsData';

export default function CocktailsPage() {
  const [activeTab, setActiveTab] = useState(cocktailsCategorias[0]);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollingToSection = useRef(false);
  const activeTabRef = useRef(activeTab);
  
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
        const lastSection = cocktailsCategorias[cocktailsCategorias.length - 1];
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
  }, []);
  
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
          <h1 className="text-ribello-gold text-xl font-serif font-bold ml-4">COCKTAILS</h1>
        </header>

        {/* Barra de navegación principal */}
        <Tabs 
          tabs={cocktailsCategorias} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
        />
      </div>

      {/* Espacio para compensar los elementos fijos */}
      <div className="h-[106px]"></div>

      {/* Contenido principal */}
      <main className="flex-1 p-4 pt-6">
        {/* Sección de cócteles con licor */}
        <ProductSection 
          title="Con Licor" 
          products={cocktailsConLicor}
          setActiveTab={setActiveTab}
          observerRefs={sectionRefs}
        />
        
        {/* Sección de cócteles sin licor */}
        <ProductSection 
          title="Sin Licor" 
          products={cocktailsSinLicor}
          setActiveTab={setActiveTab}
          observerRefs={sectionRefs}
        />

        {/* Información sobre tamaños y precios disponibles */}
        <div className="mt-8 p-5 bg-gradient-to-br from-ribello-gold/20 to-black rounded-lg shadow-lg border border-ribello-gold">
          <h2 className="text-ribello-gold text-center text-xl font-serif font-bold mb-4">PRECIOS DE CÓCTELES</h2>
          <div className="flex justify-around items-center flex-wrap gap-4">
            {tamanosDisponibles.map((tamano) => (
              <div key={tamano.id} className="bg-black p-4 rounded-lg text-center w-24 md:w-32 border border-ribello-gold shadow-md">
                <span className="inline-block text-white text-xs mb-1 bg-ribello-gold/30 rounded-full px-2 py-1">Tamaño</span>
                <p className="text-ribello-gold font-bold text-xl">{tamano.name}</p>
                <div className="w-10 h-10 flex items-center justify-center mx-auto my-2 bg-ribello-gold rounded-full">
                  <span className="text-black font-bold">{tamano.id}</span>
                </div>
                <p className="text-white text-lg font-bold">${tamano.precio.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white mt-4">Todos nuestros cócteles están disponibles en estos tamaños</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}