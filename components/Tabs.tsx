import React, { useRef, useEffect } from 'react';

interface TabProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

const Tabs: React.FC<TabProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  className = '',
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Efecto para desplazar la barra de tabs cuando cambia la pestaña activa
  useEffect(() => {
    if (tabsContainerRef.current && activeTabRef.current) {
      const container = tabsContainerRef.current;
      const activeButton = activeTabRef.current;

      // Calcular el desplazamiento necesario para centrar la pestaña activa
      const containerWidth = container.offsetWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;

      // Centrar el botón activo en el contenedor
      const scrollPosition =
        buttonLeft - containerWidth / 2 + buttonWidth / 2;

      // Desplazar suavemente el contenedor
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  return (
    <div
      className={`flex overflow-x-auto bg-black sticky top-0 z-10 px-2 pt-2 ${className} hide-scrollbar`}
    >
      <div
        ref={tabsContainerRef}
        className="flex space-x-1 w-full overflow-x-auto scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={activeTab === tab ? activeTabRef : null}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
              activeTab === tab
                ? 'bg-gradient-to-b from-amber-700 to-amber-600 text-black font-bold'
                : 'bg-black text-amber-500 hover:bg-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;