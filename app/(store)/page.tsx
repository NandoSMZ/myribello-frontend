import React from 'react';
import Link from 'next/link';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Logo en la parte superior */}
        <div className="mb-12 mt-10">
          <Logo />
        </div>
        
        {/* Botones de navegación */}
        <div className="flex flex-col w-full max-w-xs gap-6 mb-16">
          <Link href="/bistro" className="w-full">
            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all">
              <span className="text-2xl">🍔</span>
              <span className="text-xl tracking-wider">BISTRO</span>
            </button>
          </Link>
          
          <Link href="/cocktails" className="w-full">
            <button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all">
              <span className="text-2xl">🥂</span>
              <span className="text-xl tracking-wider">COCKTAILS</span>
            </button>
          </Link>
        </div>
      </main>
      
      {/* Footer con información de contacto */}
      <Footer />
    </div>
  );
}
