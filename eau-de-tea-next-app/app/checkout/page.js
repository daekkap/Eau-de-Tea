'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleCheckout = (event) => {
    // form의 기본 제출 동작(페이지 새로고침)을 막습니다.
    event.preventDefault(); 
    
    alert('주문이 완료되었습니다! (실제 결제는 이루어지지 않았습니다)');
    
    // 장바구니를 비웁니다.
    clearCart();
    
    // 주문 완료 페이지로 이동합니다.
    router.push('/order-complete');
  };

  return (
    <main>
      <section id="checkout">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handleCheckout}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">이름</label>
            <input type="text" id="name" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">배송 주소</label>
            <input type="text" id="address" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">이메일</label>
            <input type="email" id="email" className="form-input" required />
          </div>
          
          {/* 실제 결제 정보는 여기에 추가됩니다. (예: Stripe Elements) */}
          
          <div className="checkout-button-container">
            <button type="submit" className="checkout-btn">
              주문 완료하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
