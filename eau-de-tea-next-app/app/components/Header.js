'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { items } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // reduce를 사용하여 총 수량 계산 (안전장치 추가)
  const cartCount = Array.isArray(items) ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        {/* 1. 로고 (맨 왼쪽) */}
        <div className="logo-container">
          <Link href="/" className="logo" onClick={closeNav}>
            Eau de Tea
          </Link>
        </div>

        {/* 2. 모바일용 햄버거 버튼 */}
        <button className="hamburger-btn" onClick={toggleNav}>
          ☰
        </button>

        {/* 3. 메뉴 링크들 (중앙) */}
        <div className={`nav-links-container ${isNavOpen ? 'nav-open' : ''}`}>
          <Link href="/" className="nav-item" onClick={closeNav}>
            HOME
          </Link>
          <Link href="/shop" className="nav-item" onClick={closeNav}>
            SHOP
          </Link>
          <Link href="/about" className="nav-item" onClick={closeNav}>
            ABOUT
          </Link>
          <Link href="/faqs" className="nav-item" onClick={closeNav}>
            FAQS
          </Link>

          {/* 모바일 화면에서는 장바구니가 메뉴 안에 포함될 수도 있음 (선택 사항) */}
        </div>

        {/* 4. 장바구니 버튼 (★위치 이동됨: 맨 오른쪽으로★) */}
        <div className="cart-button">
          <Link href="/cart">
            CART ({cartCount})
          </Link>
        </div>
      </nav>
    </header>
  );
}