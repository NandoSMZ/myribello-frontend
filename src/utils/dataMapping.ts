import { Product } from '../../data/bistroData';
import { CocktailProduct } from '../../data/cocktailsData';
import { BackendProduct } from '../services/api';

// Mapear producto del backend al formato del frontend
export const mapBackendProductToFrontend = (backendProduct: BackendProduct): Product => {
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    description: backendProduct.description,
    price: backendProduct.price,
    image: backendProduct.image,
    category: backendProduct.category.name
  };
};

// Mapear producto del backend al formato de cóctel
export const mapBackendProductToCocktail = (backendProduct: BackendProduct): CocktailProduct => {
  return {
    id: backendProduct.id.toString(),
    name: backendProduct.name,
    description: backendProduct.description,
    price: backendProduct.price,
    image: backendProduct.image,
    category: backendProduct.category.name,
    hasAlcohol: backendProduct.category.name === 'Con Licor'
  };
};

// Categorías para Bistro (IDs basados en el seeder)
export const BISTRO_CATEGORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8]; // Hamburguesas, Pizza, Sandwiches, Lasagna, Gaseosas, Limonadas, Jugos Naturales, Cervezas

// Categorías para Cócteles (IDs basados en el seeder)
export const COCKTAIL_CATEGORY_IDS = [9, 10]; // Con Licor, Sin Licor

// Función para determinar si una categoría pertenece a Bistro
export const isBistroCategory = (categoryId: number): boolean => {
  return BISTRO_CATEGORY_IDS.includes(categoryId);
};

// Función para determinar si una categoría pertenece a Cócteles
export const isCocktailCategory = (categoryId: number): boolean => {
  return COCKTAIL_CATEGORY_IDS.includes(categoryId);
};

// Agrupar productos por categoría
export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
  return products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};
