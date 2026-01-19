'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, addToCart, decreaseQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <main>
      <section id="cart">
        <h2>Your Cart</h2>
        {items.length === 0 ? (
          <p>장바구니가 비어있습니다.</p>
        ) : (
          <div className="cart-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>이미지</th>
                  <th>상품</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>합계</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="cart-item-row">
                    {/* 데스크톱 뷰 */}
                    <td className="desktop-view"><Image src={item.image} alt={item.name} className="cart-item-image" width={80} height={80} /></td>
                    <td className="desktop-view">{item.name}</td>
                    <td className="desktop-view">{item.price.toLocaleString()}원</td>
                    <td className="desktop-view">
                        <div className='quantity-controls'>
                            <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                            {item.quantity}
                            <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                        </div>
                    </td>
                    <td className="desktop-view">{(item.price * item.quantity).toLocaleString()}원</td>
                    <td className="desktop-view"><button onClick={() => removeFromCart(item.id)} className="remove-btn">삭제</button></td>

                    {/* 모바일 뷰 */}
                    <td className="mobile-view" colSpan="6">
                        <div className="mobile-cart-item">
                            <div className="mobile-cart-image">
                                <Image src={item.image} alt={item.name} className="cart-item-image" width={60} height={60} />
                            </div>
                            <div className="mobile-cart-details">
                                <p className="mobile-cart-name">{item.name}</p>
                                <div className="quantity-controls-mobile">
                                    <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                                </div>
                                <p className="mobile-cart-price">{(item.price * item.quantity).toLocaleString()}원</p>

                            </div>
                            <div className="mobile-cart-actions">
                                <button onClick={() => removeFromCart(item.id)} className="remove-btn">×</button>
                            </div>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-summary">
              <div className="cart-total">
                <h3>총 주문 금액: {totalPrice.toLocaleString()}원</h3>
              </div>
              <div className="checkout-button-container">
                <Link href="/checkout" className="checkout-btn">
                  구매하기
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}