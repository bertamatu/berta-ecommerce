'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '@/types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const { showToast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        setItems(parsedWishlist);
        setItemCount(parsedWishlist.length);
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items));
      setItemCount(items.length);
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [items]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems((prevItems) => [...prevItems, product]);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId: number) => {
    const product = items.find((item) => item.id === productId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    if (product) {
      showToast(`${product.name} removed from wishlist`, 'info');
    }
  };

  const isInWishlist = (productId: number) => {
    return items.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    showToast('Wishlist cleared', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
