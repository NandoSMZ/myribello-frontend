import { API_CONFIG, apiRequest } from '../config/api';

export interface ProductFormData {
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: number;
  status?: boolean; // Opcional para que use el valor por defecto del backend
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  categoryId: number;
  status: boolean; // Campo obligatorio en la respuesta
  category: {
    id: number;
    name: string;
  };
}

export interface Category {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const adminProductService = {
  // Obtener todos los productos
  async getProducts(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}?take=100`);
      
      if (!response.ok) {
        return { success: false, message: 'Error al cargar productos' };
      }

      const data = await response.json();
      return { success: true, data: data.products || [] };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Obtener categorías
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES);
      
      if (!response.ok) {
        return { success: false, message: 'Error al cargar categorías' };
      }

      const data = await response.json();
      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Crear producto
  async createProduct(productData: ProductFormData): Promise<ApiResponse<Product>> {
    try {
      const response = await apiRequest(API_CONFIG.ENDPOINTS.PRODUCTS, {
        method: 'POST',
        body: JSON.stringify({
          ...productData,
          price: Number(productData.price),
          categoryId: Number(productData.categoryId),
        }),
      });

      if (!response.ok) {
        return { success: false, message: 'Error al crear el producto' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Actualizar producto
  async updateProduct(id: number, productData: ProductFormData): Promise<ApiResponse<Product>> {
    try {
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...productData,
          price: Number(productData.price),
          categoryId: Number(productData.categoryId),
        }),
      });

      if (!response.ok) {
        return { success: false, message: 'Error al actualizar el producto' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Eliminar producto
  async deleteProduct(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return { success: false, message: 'Error al eliminar el producto' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Subir imagen
  async uploadImage(file: File): Promise<ApiResponse<{ secure_url: string }>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        return { success: false, message: 'Error al subir la imagen' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },

  // Cambiar status de producto (activar/desactivar)
  async toggleProductStatus(productId: number, status: boolean): Promise<ApiResponse<Product>> {
    try {
      const response = await apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${productId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Error al cambiar el status del producto' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error toggling product status:', error);
      return { success: false, message: 'Error de conexión' };
    }
  },
};
