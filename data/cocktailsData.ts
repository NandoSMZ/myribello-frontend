// Datos para la sección Cocktails del restaurante Ribello
// Aquí puedes agregar más cócteles siguiendo la misma estructura
import { cervezas, Product } from './bistroData';

// Cócteles con licor
export const cocktailsConLicor: Product[] = [
  {
    id: 'cock1',
    name: 'Fresa Boom',
    description: 'Fresa Bombombum con Wiskey',
    price: 12000,
    image: '/images/default.jpg',
    category: 'Con Licor'
  },
  {
    id: 'cock2',
    name: 'Miami',
    description: 'Kola, Melon, Ron Blanco',
    price: 12000,
    image: '/images/default.jpg',
    category: 'Con Licor'
  }
];

// Cócteles sin licor
export const cocktailsSinLicor: Product[] = [
  {
    id: 'mock1',
    name: 'Mango Viche',
    description: 'Refrescante Mango Viche sin licor',
    price: 10000,
    image: '/images/default.jpg',
    category: 'Sin Licor'
  }
];

// Agrupamos todos los productos de cocktails para facilitar su uso
export const allCocktailsProducts: Product[] = [
  ...cocktailsConLicor,
  ...cocktailsSinLicor,
  ...cervezas
];

// Categorías principales de Cocktails
export const cocktailsCategorias = [
  'Con Licor',
  'Sin Licor',
  'Cerveza'
];