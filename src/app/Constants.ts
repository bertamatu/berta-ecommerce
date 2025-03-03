import { Product } from '@/types';

export const WEB_APP_TITLE = 'B-EC';
export const WEB_APP_DESCRIPTION =
  'B-EC is a platform for buying and selling products online';

export const ROUTES = {
  INTERIOR: {
    path: '/interior',
    label: 'INTERIOR',
    categories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'],
  },
  GARDEN: {
    path: '/garden-patio',
    label: 'GARDEN & PATIO',
    categories: ['Furniture', 'Plants', 'Decor', 'Lighting'],
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

export const products: Product[] = [
  {
    id: 1,
    name: 'Elegant Velvet Sofa',
    price: 799.99,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Living Room',
    description: 'A luxurious velvet sofa perfect for adding a touch of elegance to your living space.  Features plush cushions and a sturdy wooden frame.',
    rating: 4.5,
    stock: 15,
    discount: 0,
  },
  {
    id: 2,
    name: 'Modern Minimalist Bed Frame',
    price: 449.50,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bedroom',
    description: 'A sleek and modern bed frame designed for minimalist aesthetics.  Made from durable metal with a powder-coated finish.',
    rating: 4.2,
    stock: 8,
    discount: 10, // 10% discount
  },
  {
    id: 3,
    name: 'Rustic Wooden Dining Table',
    price: 599.00,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Kitchen',
    description: 'A charming rustic dining table crafted from solid wood.  Perfect for family meals and gatherings.',
    rating: 4.8,
    stock: 22,
    discount: 5, // 5% discount
  },
  {
    id: 4,
    name: 'Contemporary Bathroom Vanity',
    price: 329.75,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bathroom',
    description: 'A stylish bathroom vanity with a modern design.  Features ample storage space and a durable countertop.',
    rating: 4.0,
    stock: 10,
    discount: 0,
  },
  {
    id: 5,
    name: 'Ergonomic Office Chair',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Office',
    description: 'A comfortable and supportive ergonomic office chair.  Designed for long hours of work with adjustable features.',
    rating: 4.6,
    stock: 30,
    discount: 15, // 15% discount
  },
  {
    id: 6,
    name: 'Wicker Patio Furniture Set',
    price: 899.00,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Furniture',
    description: 'A beautiful wicker patio furniture set perfect for outdoor relaxation. Includes a sofa, two chairs, and a coffee table.',
    rating: 4.3,
    stock: 5,
    discount: 0,
  },
  {
    id: 7,
    name: 'Assorted Succulent Plants (Set of 3)',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Plants',
    description: 'A collection of three assorted succulent plants in decorative pots.  Easy to care for and perfect for adding greenery to your space.',
    rating: 4.7,
    stock: 50,
    discount: 20, // 20% discount
  },
  {
    id: 8,
    name: 'Outdoor String Lights',
    price: 19.50,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Lighting',
    description: 'A set of warm white outdoor string lights perfect for creating a cozy ambiance in your garden or patio.',
    rating: 4.4,
    stock: 40,
    discount: 0,
  },
  {
    id: 9,
    name: 'Decorative Garden Gnome',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Decor',
    description: 'A whimsical garden gnome statue to add a touch of fun to your outdoor space. Made from durable resin.',
    rating: 3.9,
    stock: 60,
    discount: 10, // 10% discount
  },
  {
    id: 10,
    name: 'Modern Floor Lamp',
    price: 129.00,
    image: 'https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Lighting',
    description: 'A sleek and modern floor lamp with an adjustable head. Perfect for reading or adding ambient light to any room.',
    rating: 4.5,
    stock: 25,
    discount: 0,
  },
];