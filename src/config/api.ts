// Configuración de la API del backend
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    RECOMMEND: '/recommend',
    INDEX_MENU: '/recommend/index',
    PRODUCTS: '/products',
    CATEGORIES: '/categories',
    AUTH_LOGIN: '/auth/login',
    AUTH_VALIDATE: '/auth/validate',
    UPLOAD_IMAGE: '/products/upload-image'
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
