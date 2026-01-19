'use client'; // onClick 등 사용자 상호작용이 있으므로 클라이언트 컴포넌트로 지정

import Image from 'next/image';
import { useCart } from '../context/CartContext'; // useCart 훅을 임포트

export default function ShopPage() {
  // useCart 훅을 호출하여 addToCart 함수를 가져옴
  const { addToCart } = useCart();

  // 상품 데이터에 price 추가
  const products = [
    { id: 1, name: '얼그레이 클래식', description: '베르가못 향이 감도는 클래식한 홍차', image: '/images/tea-bag1.jpg', price: 12000 },
    { id: 2, name: '캐모마일 가든', description: '편안한 밤을 위한 부드러운 허브티', image: '/images/tea-bag2.jpg', price: 15000 },
  ];

  return (
    <main>
      <section id="shop">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-placeholder">
                {/* width와 height 속성 다시 추가 */}
                <Image src={product.image} alt={product.name} className="product-image" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* 가격 정보를 포함한 product 객체를 전달합니다. */}
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
