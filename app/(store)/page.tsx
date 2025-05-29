import React from 'react';
import Link from 'next/link';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import { GiHamburger } from "react-icons/gi"; 
import { RiDrinks2Fill } from "react-icons/ri";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex-1 flex flex-col">
        {/* Logo en la parte superior con espacio fijo */}
        <div className="flex justify-center mt-8 mb-auto">
          <Logo />
        </div>
        
        {/* Botones de navegación centrados verticalmente */}
        <div className="flex flex-col w-full max-w-xs mx-auto gap-6 my-auto">
          <Link href="/bistro" className="w-full">
            <button className="w-full bg-[var(--color-ribello-gold)] hover:bg-[#e2bc50] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all">
                <GiHamburger className="text-3xl" />
                <span className="text-xl tracking-wider">BISTRO</span>
            </button>
          </Link>
          
          <Link href="/cocktails" className="w-full">
            <button className="w-full bg-[var(--color-ribello-gold)] hover:bg-[#e2bc50] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all">
                <RiDrinks2Fill className="text-3xl" />
                <span className="text-xl tracking-wider">COCKTAILS</span>
            </button>
          </Link>
        </div>
        
        {/* Footer con información de contacto con espacio fijo */}
        <div className="mt-auto mb-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
