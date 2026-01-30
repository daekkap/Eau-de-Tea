'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  // 총액 계산
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 1. 장바구니가 비었을 때
  if (items.length === 0) {
    return (
      /* ★ 핵심 수정 1: div -> main 태그로 변경 
         globals.css에 있는 'main { flex: 1 }' 속성을 받아서 
         남은 공간을 꽉 채우게 되어 푸터를 아래로 밀어냅니다.
      */
      <main className="content-section" style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '60vh' /* 화면 중간쯤에 메시지가 오도록 높이 지정 */
      }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>장바구니에 담긴 상품이 없습니다.</p>
        <Link href="/shop">
          <button className="add-to-cart-btn">GO TO SHOP</button>
        </Link>
      </main>
    );
  }

  // 2. 장바구니에 상품이 있을 때
  return (
    /* ★ 핵심 수정 2: section -> main 태그로 변경 */
    <main id="cart">
      <div className="content-section">
        <h2>SHOPPING CART</h2>

        <div className="cart-container">
          {/* 모바일용 카드 변환 테이블 (기존 코드 유지) */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {/* 1. 상품 이미지 & 이름 */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <div className="cart-item-image" style={{ position: 'relative', overflow: 'hidden' }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <span style={{ marginTop: '10px', fontWeight: 'bold' }}>{item.name}</span>
                    </div>
                  </td>

                  {/* 2. 가격 */}
                  <td>₩ {item.price.toLocaleString()}</td>

                  {/* 3. 수량 조절 */}
                  <td>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </td>

                  {/* 4. 총 가격 (단가 * 수량) */}
                  <td style={{ fontWeight: 'bold' }}>
                    ₩ {(item.price * item.quantity).toLocaleString()}
                  </td>

                  {/* 5. 삭제 버튼 (X) */}
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 하단 결제 요약 */}
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: ₩ {totalAmount.toLocaleString()}</h3>
            </div>
            <Link href="/checkout">
              <button className="checkout-btn">CHECKOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}