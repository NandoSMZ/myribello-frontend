import { API_CONFIG, apiRequest } from '../config/api';

// Tipos para los datos del backend
export type BackendProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  status: boolean;
  category: {
    id: number;
    name: string;
  };
};

export type BackendCategory = {
  id: number;
  name: string;
};

// Servicios para obtener datos del backend
export const productService = {
  // Obtener todos los productos
  async getAllProducts(): Promise<BackendProduct[]> {
    try {
      // Solicitamos un límite alto para obtener todos los productos
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}?take=1000`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Products API Error Response:', errorText);
        throw new Error(`Error fetching products: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // El backend devuelve { products: [...], total: number }
      // Extraemos solo el array de productos
      return data.products || [];
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  },

  // Obtener productos por categoría
  async getProductsByCategory(categoryId: number): Promise<BackendProduct[]> {
    try {
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}?categoryId=${categoryId}`);
      if (!response.ok) {
        throw new Error('Error fetching products by category');
      }
      const data = await response.json();
      
      // El backend devuelve { products: [...], total: number }
      // Extraemos solo el array de productos
      return data.products || [];
    } catch (error) {
      console.error('Error getting products by category:', error);
      return [];
    }
  }
};

export const categoryService = {
  // Obtener todas las categorías
  async getAllCategories(): Promise<BackendCategory[]> {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Categories API Error Response:', errorText);
        throw new Error(`Error fetching categories: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }
};
