// Product Types
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  mainCategory: string;
  description: string;
  rating: number;
  stock: number;
  discount: number;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Cart Types
export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}

// Navigation Types
export interface NavItem {
  path: string;
  label: string;
  categories?: string[];
}

// Review Types
export interface Review {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}
