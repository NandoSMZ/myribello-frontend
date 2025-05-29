// Datos para la sección Cocktails del restaurante Ribello
// Aquí puedes agregar más cócteles siguiendo la misma estructura
import { Product } from './bistroData';

// Definición de tipos para los cócteles
export type CocktailProduct = Product & {
  hasAlcohol: boolean;
};

// Cócteles con licor
export const cocktailsConLicor: CocktailProduct[] = [
  {
    id: 'cock1',
    name: 'Fresa Boom',
    description: 'Fresa Bombombum con Whiskey',
    price: 0, // Valor dummy para satisfacer el tipo, no se mostrará en UI
    image: '/images/cocteles/cock1.jpg',
    category: 'Con Licor',
    hasAlcohol: true
  },
  {
    id: 'cock2',
    name: 'Miami',
    description: 'Kola, Melón, Ron Blanco',
    price: 0, // Valor dummy para satisfacer el tipo, no se mostrará en UI
    image: '/images/cocteles/cock2.jpg',
    category: 'Con Licor',
    hasAlcohol: true
  }
];

// Cócteles sin licor
export const cocktailsSinLicor: CocktailProduct[] = [
  {
    id: 'mock1',
    name: 'Mango Viche',
    description: 'Refrescante Mango Viche sin licor',
    price: 0, // Valor dummy para satisfacer el tipo, no se mostrará en UI
    image: '/images/cocteles/cock3.jpg',
    category: 'Sin Licor',
    hasAlcohol: false
  }
];

// Agrupamos todos los productos de cocktails para facilitar su uso
export const allCocktailsProducts: CocktailProduct[] = [
  ...cocktailsConLicor,
  ...cocktailsSinLicor
];

// Categorías principales de Cocktails
export const cocktailsCategorias = [
  'Con Licor',
  'Sin Licor'
];

// Información sobre tamaños disponibles para mostrar en la interfaz
export const tamanosDisponibles = [
  { id: 'S', name: 'Small', precio: 9000 },
  { id: 'M', name: 'Medium', precio: 13000 },
  { id: 'L', name: 'Large', precio: 15000 }
];