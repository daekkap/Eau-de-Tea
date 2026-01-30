'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { cart } = useCart(); 
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = (cart && Array.isArray(cart)) 
    ? cart.reduce((total, item) => total + item.quantity, 0) 
    : 0;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        
        {/* 모바일 햄버거 버튼 */}
        <button className="hamburger-btn" onClick={toggleNav}>
          ☰
        </button>

        {/* 로고 */}
        <div className="logo-container">
          <Link href="/" className="logo" onClick={closeNav}>
            Eau de Tea
          </Link>
        </div>

        {/* 메뉴 링크들 */}
        <div className={`nav-links-container ${isNavOpen ? 'nav-open' : ''}`}>
          
          {/* 모바일 닫기 버튼 */}
          <button 
            onClick={closeNav}
            className="mobile-close-btn"
            style={{
              position: 'absolute', top: '30px', right: '30px', 
              background: 'none', border: 'none', color: 'white', fontSize: '30px', cursor: 'pointer',
              display: isNavOpen ? 'block' : 'none' 
            }}
          >
            ✕
          </button>

          <Link href="/" className="nav-item" onClick={closeNav}>
            HOME
          </Link>
          <Link href="/shop" className="nav-item" onClick={closeNav}>
            SHOP
          </Link>
          <Link href="/about" className="nav-item" onClick={closeNav}>
            ABOUT
          </Link>
          {/* ★ CHECKOUT을 지우고 FAQS를 복구했습니다! */}
          <Link href="/faqs" className="nav-item" onClick={closeNav}>
            FAQS
          </Link>
        </div>

        {/* 장바구니 버튼 */}
        <div className="cart-button">
          <Link href="/cart">
            CART ({isMounted ? cartCount : 0})
          </Link>
        </div>
      </nav>
    </header>
  );
}