'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ★ 중요: 괄호 ( ) 안에 빈 배열 []을 넣고, 그 앞에 타입을 적어야 합니다.
  const [items, setItems] = useState(/** @type {any[]} */ ([]));
  
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. [불러오기]
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart);
          } else {
            console.warn("장바구니 데이터 오류: 배열이 아님");
            setItems([]);
          }
        } catch (error) {
          console.error("장바구니 파싱 실패:", error);
          setItems([]);
        }
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. [저장하기]
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product) => {
    setItems(prevItems => {
      // items가 혹시라도 배열이 아닐 경우를 대비한 방어 코드
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const decreaseQuantity = (productId) => {
    setItems(prevItems => {
      const currentItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = currentItems.find(item => item.id === productId);
      
      if (!existingItem) return currentItems; // 없는 상품이면 그대로 리턴

      if (existingItem.quantity === 1) {
        return currentItems.filter(item => item.id !== productId);
      }
      return currentItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = Array.isArray(items) ? items.reduce((total, item) => {
    return total + (item.price || 0) * item.quantity;
  }, 0) : 0;

  const value = {
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    totalPrice,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}