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
                  <tr key={item.id}>
                    <td data-label="이미지">
                      <span className='cart-label-mobile'>이미지</span>
                      <span className='cart-value-mobile'>
                        <Image src={item.image} alt={item.name} className="cart-item-image" width={80} height={80} />
                      </span>
                    </td>
                    <td data-label="상품">
                      <span className="cart-label-mobile">상품</span>
                      <span className='cart-value-mobile'>{item.name}</span>
                    </td>
                    <td data-label="가격">
                      <span className='cart-label-mobile'>가격</span>
                      <span className='cart-value-mobile'>{item.price.toLocaleString()}원</span>
                    </td>
                    <td data-label="수량">
                      <span className='cart-label-mobile'>수량</span>
                      <span className='cart-value-mobile quantity-controles'>
                        <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                        {item.quantity}
                        <button onClick={() => addToCart(item)} className="quantity-btn">+</button>
                      </span>
                    </td>
                    <td data-label="합계">
                      <span className='cart-label-mobile'>합계</span>
                      <span className='cart-value-mobile'>{(item.price * item.quantity).toLocaleString()}원</span>
                    </td>
                    <td data-label="관리">
                      <span className='cart-label-mobile'>관리</span>
                      <span className='cart-value-mobile'><button onClick={() => removeFromCart(item.id)} className="remove-btn">삭제</button></span>
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