import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        {/* Corona de laureles (representada con caracteres especiales) */}
        <div className="text-amber-500 text-3xl absolute w-full flex justify-center -top-4">
          ❦
        </div>
        
        {/* Nombre del restaurante */}
        <h1 className="font-serif text-amber-500 text-5xl font-bold tracking-wide">
          Ribello
        </h1>
        
        {/* Año de fundación */}
        <p className="text-amber-400 text-xs tracking-widest mt-1">
          FUND. 2020
        </p>
      </div>
    </div>
  );
};

export default Logo;