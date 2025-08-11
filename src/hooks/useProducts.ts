import { useState, useEffect } from 'react';
import { Product } from '../../data/bistroData';
import { CocktailProduct } from '../../data/cocktailsData';
import { productService, categoryService } from '../services/api';
import { 
  mapBackendProductToFrontend, 
  mapBackendProductToCocktail,
  isBistroCategory,
  isCocktailCategory,
  groupProductsByCategory
} from '../utils/dataMapping';

// Hook para obtener productos de Bistro
export const useBistroProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBistroData = async () => {
      try {
        setLoading(true);
        
        // Obtener todas las categorías y productos
        const [allCategories, allProducts] = await Promise.all([
          categoryService.getAllCategories(),
          productService.getAllProducts()
        ]);

        // Validar que las respuestas sean arrays
        if (!Array.isArray(allCategories)) {
          throw new Error('Categories response is not an array');
        }
        if (!Array.isArray(allProducts)) {
          throw new Error('Products response is not an array');
        }

        // Filtrar productos de Bistro
        const bistroProducts = allProducts
          .filter(product => isBistroCategory(product.category.id))
          .map(mapBackendProductToFrontend);

        // Obtener categorías de Bistro
        const bistroCategories = allCategories
          .filter(category => isBistroCategory(category.id))
          .map(category => category.name);

        // Agrupar productos por categoría
        const grouped = groupProductsByCategory(bistroProducts);

        setProducts(bistroProducts);
        setCategories(bistroCategories);
        setGroupedProducts(grouped);
        setError(null);
      } catch (err) {
        setError('Error loading bistro data');
        console.error('Error fetching bistro data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBistroData();
  }, []);

  return { products, categories, groupedProducts, loading, error };
};

// Hook para obtener productos de Cócteles
export const useCocktailProducts = () => {
  const [products, setProducts] = useState<CocktailProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, CocktailProduct[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCocktailData = async () => {
      try {
        setLoading(true);
        
        // Obtener todas las categorías y productos
        const [allCategories, allProducts] = await Promise.all([
          categoryService.getAllCategories(),
          productService.getAllProducts()
        ]);

        // Filtrar productos de Cócteles
        const cocktailProducts = allProducts
          .filter(product => isCocktailCategory(product.category.id))
          .map(mapBackendProductToCocktail);

        // Obtener categorías de Cócteles
        const cocktailCategories = allCategories
          .filter(category => isCocktailCategory(category.id))
          .map(category => category.name);

        // Agrupar productos por categoría
        const grouped = cocktailProducts.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {} as Record<string, CocktailProduct[]>);

        setProducts(cocktailProducts);
        setCategories(cocktailCategories);
        setGroupedProducts(grouped);
        setError(null);
      } catch (err) {
        setError('Error loading cocktail data');
        console.error('Error fetching cocktail data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktailData();
  }, []);

  return { products, categories, groupedProducts, loading, error };
};
