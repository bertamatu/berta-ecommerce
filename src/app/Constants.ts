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
    categories: ['Furniture', 'Plants', 'Decor', 'Tools', 'Lighting'],
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
