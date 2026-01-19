'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from './context/CartContext';
import './globals.css';

function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <nav className="main-nav">
        <button className="hamburger-btn" onClick={toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </button>
        <div className="logo-container">
          <Link href="/" className="logo">Eau de Tea</Link>
        </div>
        <div className="cart-button">
          <Link href="/cart">CART ({items.length})</Link>
        </div>
      </nav>
      <div className={`nav-links-container ${isMenuOpen ? 'nav-open' : ''}`}>
        <Link href="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>HOME</Link>
        <Link href="/shop" className="nav-item" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
        <Link href="/about" className="nav-item" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
        <Link href="/faqs" className="nav-item" onClick={() => setIsMenuOpen(false)}>FAQS</Link>
      </div>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}