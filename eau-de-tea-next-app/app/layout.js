'use client';

import Link from 'next/link';
import { CartProvider, useCart } from './context/CartContext';
import './globals.css';

// 헤더 컴포넌트를 분리하여 Context의 값에 접근할 수 있도록 함
function Header() {
  const { items } = useCart(); // useCart 훅을 사용해 장바구니 아이템들을 가져옴

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="nav-links">
          <Link href="/" className="nav-item">HOME</Link>
          <Link href="/shop" className="nav-item">SHOP</Link>
          <Link href="/about" className="nav-item">ABOUT</Link>
          <Link href="/faqs" className="nav-item">FAQS</Link>
        </div>
        <div className="cart-button">
          {/* 이제 장바구니 아이템의 실제 개수를 표시 */}
          <Link href="/cart">CART ({items.length})</Link>
        </div>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* CartProvider로 헤더와 페이지 컨텐츠({children})를 모두 감쌈 */}
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
