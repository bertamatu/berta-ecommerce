import { Product } from '@/types';

// Application constants
export const WEB_APP_TITLE = 'B-EC';
export const WEB_APP_DESCRIPTION =
  'B-EC is a platform for buying and selling products online';

// Using const assertion for better type safety
export const ROUTES = {
  INTERIOR: {
    path: '/interior',
    label: 'INTERIOR',
    categories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'],
  },
  GARDEN: {
    path: '/garden-patio',
    label: 'GARDEN & PATIO',
    categories: ['Furniture', 'Plants', 'Decor', 'Lighting', 'Outdoor'],
  },
  SEARCH: {
    path: '/search',
    label: 'Search',
  },
  ACCOUNT: {
    path: '/account',
    label: 'Account',
  },
  WISHLIST: {
    path: '/wishlist',
    label: 'Wishlist',
  },
  CART: {
    path: '/cart',
    label: 'Shopping Cart',
  },
} as const;

// Using object property shorthand and template literals where appropriate
// Creating a helper function to generate product descriptions with template literals
const createProductDescription = (
  type: string,
  features: string,
  benefit: string
) => `A ${type} perfect for ${benefit}. ${features}`;

// Using array methods and object property shorthand
export const products: Product[] = [
  {
    id: 1,
    name: 'Elegant Minimalist Sofa',
    price: 799.99,
    image: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg',
    category: 'Living Room',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'elegant minimalist sofa',
      'Features plush cushions and a sturdy wooden frame.',
      'adding a touch of elegance to your living space'
    ),
    rating: 4.5,
    stock: 15,
    discount: 0,
  },
  {
    id: 2,
    name: 'Modern Minimalist Chair',
    price: 449.5,
    image:
      'https://images.pexels.com/photos/16804491/pexels-photo-16804491/free-photo-of-armchair-floor-lamp-and-a-houseplant-standing-in-a-corner.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Living Room',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'sleek and modern chair',
      'Made from durable metal with a powder-coated finish.',
      'minimalist aesthetics'
    ),
    rating: 4.2,
    stock: 8,
    discount: 10,
  },
  {
    id: 3,
    name: 'Rustic Wooden Dining Table Chair',
    price: 599.0,
    image:
      'https://images.pexels.com/photos/29350087/pexels-photo-29350087/free-photo-of-stylish-wooden-armchair-with-textured-walls.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Kitchen',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'charming rustic dining table chair',
      'Crafted from solid wood.',
      'family meals and gatherings'
    ),
    rating: 4.8,
    stock: 22,
    discount: 5,
  },
  {
    id: 4,
    name: 'Contemporary Bathroom Vanity',
    price: 329.75,
    image:
      'https://images.pexels.com/photos/30036761/pexels-photo-30036761/free-photo-of-stylish-woven-design-cabinet-with-decorative-vases.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bathroom',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'stylish bathroom vanity with a modern design',
      'Features ample storage space and a durable countertop.',
      'upgrading your bathroom'
    ),
    rating: 4.0,
    stock: 10,
    discount: 0,
  },
  {
    id: 5,
    name: 'Ergonomic Office Chair',
    price: 1249.99,
    image:
      'https://images.pexels.com/photos/7195522/pexels-photo-7195522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Office',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'comfortable and supportive ergonomic office chair',
      'Designed for long hours of work with adjustable features.',
      'maintaining good posture during work'
    ),
    rating: 4.6,
    stock: 30,
    discount: 15,
  },
  {
    id: 6,
    name: 'Patio Furniture Set',
    price: 899.0,
    image:
      'https://images.pexels.com/photos/17472915/pexels-photo-17472915/free-photo-of-minimalist-cafe-and-restaurant-to-relax-estheticians.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Furniture',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'beautiful wicker patio furniture set',
      '',
      'outdoor relaxation'
    ),
    rating: 4.3,
    stock: 5,
    discount: 0,
  },
  {
    id: 7,
    name: 'Succulent Plant Pot',
    price: 29.99,
    image:
      'https://images.pexels.com/photos/8989203/pexels-photo-8989203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Plants',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'decorative pot for succulent plants',
      'Easy to care for and perfect for adding greenery to your space.',
      'bringing nature indoors'
    ),
    rating: 4.7,
    stock: 50,
    discount: 20,
  },
  {
    id: 8,
    name: 'Outdoor String Light',
    price: 19.5,
    image:
      'https://images.pexels.com/photos/15590451/pexels-photo-15590451/free-photo-of-light-bulb-on-string.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Lighting',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'set of warm white outdoor light',
      '',
      'creating a cozy ambiance in your garden or patio'
    ),
    rating: 4.4,
    stock: 40,
    discount: 0,
  },
  {
    id: 9,
    name: 'Decorative Patio Pillows Set',
    price: 14.99,
    image:
      'https://images.pexels.com/photos/17145784/pexels-photo-17145784/free-photo-of-garden-furniture-with-cushions.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Decor',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'set of decorative patio pillows',
      '',
      'adding a touch of fun to your outdoor space'
    ),
    rating: 3.9,
    stock: 60,
    discount: 10,
  },
  {
    id: 10,
    name: 'Modern Floor Lamp',
    price: 129.0,
    image:
      'https://images.pexels.com/photos/19714779/pexels-photo-19714779/free-photo-of-modern-floor-lamp-standing-in-an-empty-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Living Room',
    mainCategory: 'INTERIOR',
    description: createProductDescription(
      'sleek and modern floor lamp with an adjustable head',
      '',
      'reading or adding ambient light to any room'
    ),
    rating: 4.5,
    stock: 25,
    discount: 0,
  },
  {
    id: 11,
    name: 'Patio Hanging Chair Set',
    price: 2999.99,
    image:
      'https://images.pexels.com/photos/13304232/pexels-photo-13304232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Furniture',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'set of patio hanging chairs',
      '',
      'adding a touch of elegance to your outdoor space'
    ),
    rating: 5,
    stock: 2,
    discount: 0,
  },
  {
    id: 12,
    name: 'Original Hammock',
    price: 1999.99,
    image:
      'https://images.pexels.com/photos/14524375/pexels-photo-14524375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Outdoor',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'elegant original hammock',
      '',
      'adding a touch of elegance to your outdoor space'
    ),
    rating: 5,
    stock: 2,
    discount: 0,
  },
  {
    id: 13,
    name: 'Outdoor Sofa',
    price: 1999.99,
    image:
      'https://images.pexels.com/photos/16318706/pexels-photo-16318706/free-photo-of-white-bench-and-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Furniture',
    mainCategory: 'GARDEN',
    description: createProductDescription(
      'elegant outdoor sofa',
      '',
      'adding a touch of elegance to your outdoor space'
    ),
    rating: 5,
    stock: 2,
    discount: 0,
  },
];
