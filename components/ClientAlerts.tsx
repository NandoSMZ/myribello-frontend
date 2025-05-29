'use client';

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ConstructionModal from './ConstructionModal';
import AlertBanner from './AlertBanner';

export default function ClientAlerts() {
  return (
    <>
      {/* Componente modal deshabilitado temporalmente
      <ConstructionModal 
        title="Sitio en Construcción" 
        message="Estimado usuario, nuestro menú digital aún se encuentra en desarrollo. Algunas funciones podrían no estar disponibles por el momento." 
      />
      */}
      <AlertBanner 
        message="Estamos mejorando nuestro menú digital. Gracias por tu paciencia." 
      />
    </>
  );
}