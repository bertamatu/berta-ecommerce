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

// Using a reusable interface for timestamps
export interface TimeStamped {
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  productId: number;
  quantity: number;
  product?: Product;
}

// Using type alias with intersection types
export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
} & TimeStamped;

// Using const assertions for better type safety with string literals
export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Using a mapped type to create the enum from the object
export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethod = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer',
} as const;

export type PaymentMethodType =
  (typeof PaymentMethod)[keyof typeof PaymentMethod];

// Order Types
// Using type alias with intersection types
export type Order = {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: OrderStatusType;
  shippingAddress: Address;
  paymentMethod: PaymentMethodType;
} & Pick<TimeStamped, 'createdAt'>;

// Navigation Types
export interface NavItem {
  path: string;
  label: string;
  categories?: string[];
}

// Review Types
// Using intersection types
export type Review = {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  comment: string;
} & Pick<TimeStamped, 'createdAt'>;
