'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  // ★ 수정 1: items 대신 cart를 가져옵니다.
  const { cart, removeFromCart, updateQuantity } = useCart();

  // ★ 수정 2: 데이터가 로딩 중일 때 cart가 undefined일 수 있으므로 빈 배열([])로 보호합니다.
  const cartList = cart || [];

  // ★ 수정 3: items.reduce -> cartList.reduce
  const totalAmount = cartList.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 1. 장바구니가 비었을 때
  if (cartList.length === 0) {
    return (
      <main className="content-section" style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '60vh'
      }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>장바구니에 담긴 상품이 없습니다.</p>
        <Link href="/shop">
          <button className="add-to-cart-btn" style={{ padding: '15px 30px', cursor: 'pointer' }}>GO TO SHOP</button>
        </Link>
      </main>
    );
  }

  // 2. 장바구니에 상품이 있을 때
  return (
    <main id="cart">
      <div className="content-section">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>SHOPPING CART</h2>

        <div className="cart-container">
          <table className="cart-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '15px' }}>Product</th>
                <th style={{ padding: '15px' }}>Price</th>
                <th style={{ padding: '15px' }}>Quantity</th>
                <th style={{ padding: '15px' }}>Total</th>
                <th style={{ padding: '15px' }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* ★ 수정 4: items.map -> cartList.map */}
              {cartList.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  
                  {/* 1. 상품 이미지 & 이름 */}
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      {/* 이미지 크기가 명시되지 않아 임의로 크기 지정 (width: 80px, height: 80px) */}
                      <div className="cart-item-image" style={{ position: 'relative', width: '80px', height: '80px', overflow: 'hidden', borderRadius: '8px' }}>
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
                  <td style={{ textAlign: 'center' }}>₩ {item.price.toLocaleString()}</td>

                  {/* 3. 수량 조절 */}
                  <td style={{ textAlign: 'center' }}>
                    <div className="quantity-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '30px', height: '30px', cursor: 'pointer' }}
                      >+</button>
                    </div>
                  </td>

                  {/* 4. 총 가격 */}
                  <td style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    ₩ {(item.price * item.quantity).toLocaleString()}
                  </td>

                  {/* 5. 삭제 버튼 */}
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', color: '#999' }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 하단 결제 요약 */}
          <div className="cart-summary" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="cart-total" style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <h3>Total: ₩ {totalAmount.toLocaleString()}</h3>
            </div>
            <Link href="/checkout">
              <button className="checkout-btn" style={{ padding: '15px 40px', background: 'black', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}