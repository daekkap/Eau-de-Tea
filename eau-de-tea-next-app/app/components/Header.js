'use client';

import { useState } from 'react'; // useEffect 삭제
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect와 mounted 삭제 (지금 단계에선 불필요)

  // 장바구니 총 수량 계산
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        {/* 모바일 햄버거 버튼 */}
        <button className="hamburger-btn" onClick={toggleMenu}>
          &#9776;
        </button>
        
        <div className="logo-container">
          <Link href="/" className="logo">Eau de Tea</Link>
        </div>
        
        {/* 장바구니 버튼 */}
        <div className="cart-button">
          <Link href="/cart">
            {/* 복잡한 조건문 없이 바로 출력 */}
            CART ({cartCount})
          </Link>
        </div>
      </nav>

      {/* 모바일 메뉴 드로어 */}
      <div className={`nav-links-container ${isMenuOpen ? 'nav-open' : ''}`}>
        <Link href="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>HOME</Link>
        <Link href="/shop" className="nav-item" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
        <Link href="/about" className="nav-item" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
        <Link href="/faqs" className="nav-item" onClick={() => setIsMenuOpen(false)}>FAQS</Link>
      </div>
    </header>
  );
}