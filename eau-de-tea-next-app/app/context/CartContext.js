'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 초기값을 빈 배열로 설정
  const [items, setItems] = useState([]);

  // (선택사항) 로컬 스토리지에서 장바구니 불러오기
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // 장바구니가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // 1. 장바구니 담기
  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // 이미 있으면 수량만 +1
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // 없으면 새로 추가 (quantity: 1)
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // (선택사항) 알림
    // alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
  };

  // 2. 장바구니에서 삭제
  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 3. 수량 조절 (★ 이 부분이 빠져있어서 에러가 났던 겁니다!)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // 수량은 1보다 작을 수 없음

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 4. 장바구니 비우기 (결제 완료 후 사용)
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity, // ★ Provider에 꼭 넣어줘야 다른 파일에서 쓸 수 있음
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}