// Datos para la sección Cocktails del restaurante Ribello
// Aquí puedes agregar más cócteles siguiendo la misma estructura
import { Product } from './bistroData';

// Cócteles con licor
export const cocktailsConLicor: Product[] = [
  {
    id: 'cock1',
    name: 'Ribello Old Fashioned',
    description: 'Bourbon, azúcar, angostura y naranja flameada, servido con hielo esférico',
    price: 12.90,
    image: '/images/default.jpg',
    category: 'Con Licor'
  },
  {
    id: 'cock2',
    name: 'Negroni Clásico',
    description: 'Ginebra, Campari, Vermut rojo y piel de naranja',
    price: 11.50,
    image: '/images/default.jpg',
    category: 'Con Licor'
  },
  {
    id: 'cock3',
    name: 'Mojito Premium',
    description: 'Ron blanco añejado, hierba buena fresca, lima, azúcar moreno y soda',
    price: 10.90,
    image: '/images/default.jpg',
    category: 'Con Licor'
  },
  {
    id: 'cock4',
    name: 'Margarita Especial',
    description: 'Tequila premium, triple sec, zumo de lima fresco y sal en el borde',
    price: 11.90,
    image: '/images/default.jpg',
    category: 'Con Licor'
  }
];

// Cócteles sin licor
export const cocktailsSinLicor: Product[] = [
  {
    id: 'mock1',
    name: 'Virgin Mojito',
    description: 'Refrescante combinación de lima, hierba buena, azúcar y soda',
    price: 7.50,
    image: '/images/default.jpg',
    category: 'Sin Licor'
  },
  {
    id: 'mock2',
    name: 'Berry Blast',
    description: 'Frutos del bosque, zumo de arándanos, menta y soda con hielo picado',
    price: 8.90,
    image: '/images/default.jpg',
    category: 'Sin Licor'
  },
  {
    id: 'mock3',
    name: 'Tropical Sunrise',
    description: 'Zumo de naranja fresco, granadina, piña y un toque de maracuyá',
    price: 8.50,
    image: '/images/default.jpg',
    category: 'Sin Licor'
  },
  {
    id: 'mock4',
    name: 'Cucumber Refresh',
    description: 'Pepino fresco, limón, jengibre y agua tónica premium',
    price: 7.90,
    image: '/images/default.jpg',
    category: 'Sin Licor'
  }
];

// Cervezas especiales
export const cervezasCocktails: Product[] = [
  {
    id: 'beer1',
    name: 'IPA Artesanal',
    description: 'Cerveza local con notas cítricas y final amargo, 6.2% vol.',
    price: 6.90,
    image: '/images/default.jpg',
    category: 'Cerveza'
  },
  {
    id: 'beer2',
    name: 'Belgian Blonde',
    description: 'Cerveza belga de color dorado y sabor afrutado, 7.5% vol.',
    price: 7.50,
    image: '/images/default.jpg',
    category: 'Cerveza'
  },
  {
    id: 'beer3',
    name: 'Stout Cremosa',
    description: 'Cerveza negra con notas de café y chocolate, 5.5% vol.',
    price: 6.50,
    image: '/images/default.jpg',
    category: 'Cerveza'
  },
  {
    id: 'beer4',
    name: 'Trigo Artesanal',
    description: 'Cerveza de trigo refrescante con notas de plátano y clavo, 5.0% vol.',
    price: 7.20,
    image: '/images/default.jpg',
    category: 'Cerveza'
  }
];

// Agrupamos todos los productos de cocktails para facilitar su uso
export const allCocktailsProducts: Product[] = [
  ...cocktailsConLicor,
  ...cocktailsSinLicor,
  ...cervezasCocktails
];

// Categorías principales de Cocktails
export const cocktailsCategorias = [
  'Con Licor',
  'Sin Licor',
  'Cerveza'
];