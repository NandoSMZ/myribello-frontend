// Datos para la sección Bistro del restaurante Ribello
// Aquí puedes agregar más productos siguiendo la misma estructura

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Productos de hamburguesas
export const hamburgers: Product[] = [
  {
    id: 'ham1',
    name: 'Ribello Classic',
    description: 'Hamburguesa de 180g de carne angus, queso cheddar, bacon, lechuga y tomate en pan brioche',
    price: 12.50,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  },
  {
    id: 'ham2',
    name: 'Blue Cheese Burger',
    description: 'Hamburguesa gourmet con 200g de carne premium, queso azul derretido, cebolla caramelizada y rúcula',
    price: 14.90,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  }
];

// Productos de pizzas
export const pizzas: Product[] = [
  {
    id: 'piz1',
    name: 'Margherita Ribello',
    description: 'Masa artesanal, salsa de tomate casera, mozzarella fresca y albahaca',
    price: 11.90,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz2',
    name: 'Prosciutto e Funghi',
    description: 'Jamón italiano, championes frescos, mozzarella y orégano sobre masa fina',
    price: 13.50,
    image: '/images/default.jpg',
    category: 'Pizza'
  }
];

// Productos de sandwiches
export const sandwiches: Product[] = [
  {
    id: 'sand1',
    name: 'Club Sandwich',
    description: 'Triple sandwich con pollo a la parrilla, bacon crujiente, aguacate, lechuga y mayonesa especial',
    price: 10.50,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  },
  {
    id: 'sand2',
    name: 'Ribello Steak Sandwich',
    description: 'Filete angus, queso provolone, cebolla caramelizada y salsa de mostaza y miel en pan rústico',
    price: 15.90,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  }
];

// Productos de lasagna
export const lasagnas: Product[] = [
  {
    id: 'las1',
    name: 'Lasagna Bolognese',
    description: 'Capas de pasta fresca con ragú de carne, bechamel cremosa y queso parmesano gratinado',
    price: 14.50,
    image: '/images/default.jpg',
    category: 'Lasagna'
  },
  {
    id: 'las2',
    name: 'Lasagna Vegetariana',
    description: 'Capas de pasta con verduras asadas, espinacas, ricotta y salsa pomodoro casera',
    price: 13.90,
    image: '/images/default.jpg',
    category: 'Lasagna'
  }
];

// Gaseosas (ahora como categoría independiente)
export const gaseosas: Product[] = [
  {
    id: 'bev1',
    name: 'Coca-Cola',
    description: 'Refresco clásico con hielo y rodaja de limón',
    price: 3.50,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  },
  {
    id: 'bev2',
    name: 'Sprite',
    description: 'Refresco de lima-limón servido con hielo',
    price: 3.50,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  }
];

// Limonadas (ahora como categoría independiente)
export const limonadas: Product[] = [
  {
    id: 'bev3',
    name: 'Limonada Clásica',
    description: 'Jugo de limón natural, azúcar y agua mineral con hielo',
    price: 4.50,
    image: '/images/default.jpg',
    category: 'Limonadas'
  },
  {
    id: 'bev4',
    name: 'Limonada de Frutos Rojos',
    description: 'Limonada natural con puré de frutos rojos y hierba buena',
    price: 5.50,
    image: '/images/default.jpg',
    category: 'Limonadas'
  }
];

// Jugos Naturales (ahora como categoría independiente)
export const jugosNaturales: Product[] = [
  {
    id: 'bev5',
    name: 'Jugo de Naranja',
    description: 'Zumo de naranja recién exprimido',
    price: 4.90,
    image: '/images/default.jpg',
    category: 'Jugos Naturales'
  },
  {
    id: 'bev6',
    name: 'Smoothie Tropical',
    description: 'Batido de mango, piña y maracuyá con un toque de menta',
    price: 6.50,
    image: '/images/default.jpg',
    category: 'Jugos Naturales'
  }
];

// Cervezas (ahora como categoría independiente)
export const cervezas: Product[] = [
  {
    id: 'bev7',
    name: 'Cerveza Artesanal IPA',
    description: 'Cerveza local con notas cítricas y final amargo',
    price: 5.90,
    image: '/images/default.jpg',
    category: 'Cervezas'
  },
  {
    id: 'bev8',
    name: 'Cerveza Lager Premium',
    description: 'Cerveza rubia suave y refrescante',
    price: 5.50,
    image: '/images/default.jpg',
    category: 'Cervezas'
  }
];

// Agrupamos todos los productos de bistro para facilitar su uso
export const allBistroProducts: Product[] = [
  ...hamburgers,
  ...pizzas,
  ...sandwiches,
  ...lasagnas,
  ...gaseosas,
  ...limonadas,
  ...jugosNaturales,
  ...cervezas
];

// Categorías principales de Bistro
export const bistroCategorias = [
  'Hamburguesas',
  'Pizza',
  'Sandwiches',
  'Lasagna',
  'Gaseosas',
  'Limonadas',
  'Jugos Naturales',
  'Cervezas'
];