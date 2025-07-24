// Configuración de la API del backend
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    RECOMMEND: '/recommend',
    INDEX_MENU: '/recommend/index'
  }
};

// Función helper para hacer requests al backend
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
};
