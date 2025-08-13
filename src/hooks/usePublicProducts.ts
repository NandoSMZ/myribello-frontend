import { useState, useEffect } from 'react';
import { Product, Category } from '../services/adminProductService';
import { API_CONFIG, apiRequest } from '../config/api';

export const usePublicProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Cargar productos activos para el menú público
  const loadActiveProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        apiRequest(API_CONFIG.ENDPOINTS.PRODUCTS),
        apiRequest(API_CONFIG.ENDPOINTS.CATEGORIES),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error('Error al cargar datos');
      }

      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

      // Filtrar solo productos activos (status: true)
      const activeProducts = productsData.filter((product: Product) => product.status === true);
      
      setProducts(activeProducts);
      setCategories(categoriesData);
    } catch (err) {
      setError('Error de conexión');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActiveProducts();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    refetch: loadActiveProducts,
  };
};
