'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // ★ 중요: 변수 이름을 'items'에서 'cart'로 통일했습니다.
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. [불러오기] 로컬 스토리지에서 장바구니 복구
  useEffect(() => {
    // 키 이름도 'eau-de-tea-cart'로 맞춰주세요
    const savedCart = localStorage.getItem('eau-de-tea-cart'); 
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("장바구니 파싱 에러:", err);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. [저장하기] 장바구니 변경 시 자동 저장
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('eau-de-tea-cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // 상품 추가
  const addToCart = (product) => {
    setCart((prevCart) => {
      // 기존에 담긴 상품인지 확인
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // 이미 있으면 수량만 +1
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // 없으면 새로 추가
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // (선택사항) 사용자에게 알림
    // alert("장바구니에 담겼습니다!"); 
  };

  // 상품 삭제
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 수량 변경
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 장바구니 비우기
  const clearCart = () => {
    setCart([]);
  };

  // 총 가격 계산
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,           // ★ 여기가 핵심! items가 아니라 cart를 내보냅니다.
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}