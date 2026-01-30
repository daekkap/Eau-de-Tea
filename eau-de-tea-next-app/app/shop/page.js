'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ShopPage() {
  const { addToCart } = useCart();

  return (
    <main>
      <section id="shop" className="content-section">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>


              <Link
                href={`/shop/${product.id}`}
                className="product-image-placeholder"
                style={{ display: 'block', position: 'relative', width: '100%', aspectRatio: '1 / 1' }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>

              {/* 이름도 클릭하기 좋게 블록으로 변경 */}
              <Link
                href={`/shop/${product.id}`}
                style={{ display: 'inline-block', textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{product.name}</h3>
              </Link>

              <p>{product.description}</p>
              <p>₩ {product.price.toLocaleString()}</p>

              {/* 장바구니 버튼은 클릭 시 상세페이지 이동을 막아야 함 (stopPropagation) */}
              <button className="add-to-cart-btn" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // 혹시 모를 버블링 방지
                addToCart(product);
              }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}