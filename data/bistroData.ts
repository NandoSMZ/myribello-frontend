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
    name: 'Americana',
    description: 'Carne Angus, queso americano, tocineta, pepinillos, lechuga crespa, tomate, cebolla morada, salsa americana, salsa ranch, acompañada de papas a la francesa',
    price: 22000,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  },
  {
    id: 'ham2',
    name: 'Argentina',
    description: 'Carne Angus, queso americano, tocineta, chorizo argentino, salsa BBQ, lechuga Batavia, tomate, acompañada de papas a la francesa',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  }
  , 
  {
    id: 'ham3',
    name: 'Wstern Bacón',
    description: 'Doble carne Angus, queso americano, tocineta, pepinillos, aros de cebolla apanados, salsa BBQ, salsa Ranch, acompañada con papas a la francesa',
    price: 28000,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  }
  , 
  {
    id: 'ham4',
    name: 'Magistral',
    description: 'Carne Angus. queso americano. tocineta, carne de res ahumada terminada en cocción lenta, con cerveza, cebolla crispy, lechuga crespa, tomate, salsas de la casa, acompañada de papas a la francesa.',
    price: 28000,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  }
  , 
  {
    id: 'ham5',
    name: 'Gorrino',
    description: 'Carne Angus, queso americano, tocineta, pepinillos, cebolla crispy, lechuga crespa, tomate, carne de cerdo Ahumada terminada en cocción lenta con cerveza roja, acompañada de papas a la francesa.',
    price: 28000,
    image: '/images/default.jpg',
    category: 'Hamburguesas'
  }
];

// Productos de pizzas
export const pizzas: Product[] = [
  {
    id: 'piz1',
    name: 'Hawaiana',
    description: 'Jamón, piña melada, parmesano.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz2',
    name: 'Pollo y champiñones',
    description: 'Pollo, champiñones, parmesano.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz3',
    name: 'Margarita',
    description: 'Tomate, albahaca, parmesano.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz4',
    name: 'Pepperoni',
    description: 'Pepperoni, parmesano.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz5',
    name: 'De carnes',
    description: 'Chorizo, salami, tocineta, cabano, pepperoni, maduro, maicitos, pimentón escalibado, parmesano.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz6',
    name: 'Napolitana',
    description: 'Pollo, tocineta, champiñones, tomate cherry, aceituna, tomate seco, albahaca genovesa, parmesano.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz7',
    name: '4 Quesos',
    description: 'Queso mozzarella, queso azul., queso cheddar, parmesano, tomate cherry, albahaca.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz8',
    name: 'BBQ',
    description: 'Costilla desmechada, salsa BBQ, tocineta, pimentón escalibado, maicitos.',
    price: 27000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz9',
    name: 'Carbonara',
    description: 'Salsa carbonara, tocineta, maicitos, parmesano.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz10',
    name: 'Vegetariana',
    description: 'Tomate cherry, aceitunas, pimentón escalibado, champiñones, tomate seco, maicitos, parmesano.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz11',
    name: 'Boloñesa',
    description: 'Queso mozzarella, carne en salsa boloñesa, parmesano.',
    price: 27000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz12',
    name: 'Picante Mexicana',
    description: 'Carne molida, jalapeños, cebolla, pimientos, queso mozzarella.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Pizza'
  },
  {
    id: 'piz13',
    name: 'Italiana',
    description: 'Tocineta,pepperoni,tomate cherry, pimentón escalibado, parmesano.',
    price: 26000,
    image: '/images/default.jpg',
    category: 'Pizza'
  }
];

// Productos de sandwiches
export const sandwiches: Product[] = [
  {
    id: 'sand1',
    name: 'Ropa vieja',
    description: 'Pan ciabatta, carne desmechada, queso americano, tomate,lechuga, salsa ranch, salsa BBQ, acompañado con papas a la francesa.',
    price: 25000,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  },
  {
    id: 'sand2',
    name: 'BBQ',
    description: 'Pan ciabatta, cerdo desmechado, salsa BBQ, maicitos, queso americano, lechuga Batavia, salsas de la casa, acompañado con papas a la francesa.',
    price: 25000,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  },
  {
    id: 'sand3',
    name: 'Pollo',
    description: 'Pan ciabatta, pollo en salsa carbonara, queso mozzarella, tocineta, lechuga Batavia, salsa salsas de la casa, acompañado con papas a la francesa.',
    price: 25000,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  },
  {
    id: 'sand4',
    name: 'Jamón y cordero',
    description: 'Pan ciabatta, jamón de cordero, jamón de cerdo, tocineta, queso mozzarella, salsas de la casa, acompañado con papas a las francesas.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  },
  {
    id: 'sand5',
    name: 'Hawaiano',
    description: 'Pan ciabatta, jamón de cerdo, piña melada, lechuga Batavia, queso mozzarella, acompañado con papas a la francesa.',
    price: 24000,
    image: '/images/default.jpg',
    category: 'Sandwiches'
  }
];

// Productos de lasagna
export const lasagnas: Product[] = [
  {
    id: 'las1',
    name: 'Lasagna de carne',
    description: 'Bolognesa, queso mozzarrella, parmesano.',
    price: 23000,
    image: '/images/default.jpg',
    category: 'Lasagna'
  },
  {
    id: 'las2',
    name: 'Lasagna de pollo',
    description: 'Pollo en salsa bechamel, champiñones, tocineta, queso mozzarella.',
    price: 23000,
    image: '/images/default.jpg',
    category: 'Lasagna'
  },
  {
    id: 'las3',
    name: 'Lasagna mixta',
    description: 'Bolognesa, pollo en salsa bechamel, queso mozzarella, tocineta, maduro, maicitos, parmesano.',
    price: 25000,
    image: '/images/default.jpg',
    category: 'Lasagna'
  }
];

// Gaseosas (ahora como categoría independiente)
export const gaseosas: Product[] = [
  {
    id: 'bev1',
    name: 'Gaseosa personal',
    description: 'Bebida de 350 ml',
    price: 4000,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  },
  {
    id: 'bev2',
    name: 'Gaseosa litro',
    description: 'bebida de 1 litro',
    price: 8000,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  },
  {
    id: 'bev3',
    name: 'Jugos HiT',
    description: 'Jugo hit personal de 350 ml',
    price: 4000,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  },
  {
    id: 'bev4',
    name: 'Botella de agua',
    description: 'Agua Crystal de 500 ml',
    price: 3000,
    image: '/images/default.jpg',
    category: 'Gaseosas'
  }
];

// Limonadas (ahora como categoría independiente)
export const limonadas: Product[] = [
  {
    id: 'bev3',
    name: 'Cereza',
    description: 'Limonada natural con cereza fresca.',
    price: 12000,
    image: '/images/default.jpg',
    category: 'Limonadas'
  },
  {
    id: 'bev4',
    name: 'Coco',
    description: 'Limonada natural de Coco.',
    price: 12000,
    image: '/images/default.jpg',
    category: 'Limonadas'
  },
  {
    id: 'bev5',
    name: 'Natural',
    description: 'Limonada natural.',
    price: 8000,
    image: '/images/default.jpg',
    category: 'Limonadas'
  }
];

// Jugos Naturales (ahora como categoría independiente)
export const jugosNaturales: Product[] = [
  {
    id: 'bev5',
    name: 'Jugo en Agua',
    description: 'Naranja, piña y maracuyá',
    price: 8000,
    image: '/images/default.jpg',
    category: 'Jugos Naturales'
  },
  {
    id: 'bev6',
    name: 'Jugo en Leche',
    description: 'Banano, fresa y mora',
    price: 12000,
    image: '/images/default.jpg',
    category: 'Jugos Naturales'
  }
];

// Cervezas (ahora como categoría independiente)
export const cervezas: Product[] = [
  {
    id: 'bev7',
    name: 'Cerveza Corona',
    description: 'Cerveza de 300 ml',
    price: 5.90,
    image: '/images/default.jpg',
    category: 'Cervezas'
  },
  {
    id: 'bev8',
    name: 'Cerveza Aguila',
    description: 'Cerveza de 300 ml',
    price: 7000,
    image: '/images/default.jpg',
    category: 'Cervezas'
  },
  {
    id: 'bev9',
    name: 'Cerveza Poker',
    description: 'Cerveza de 300 ml',
    price: 5000,
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