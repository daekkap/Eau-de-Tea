'use client';

import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useCart } from '../context/CartContext';
import { nanoid } from 'nanoid';

// ★ API 키 확인
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();

  // ★ 테스트 모드 (100원 고정)
  const price = 100;

  const handlePayment = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;

    if (!name || !email || !address) {
      return alert("배송 정보를 모두 입력해주세요.");
    }


    // 결제 전 임시 저장
    // 장바구니 내용인 cart도 같이 저장해야 나중에 뭘 샀는지 확인 가능
    localStorage.setItem('temp_order_info', JSON.stringify({
      name,
      email,
      address,
      items: cart
    }));


    try {
      const tossPayments = await loadTossPayments(clientKey);

      await tossPayments.requestPayment('카드', {
        amount: price,
        orderId: nanoid(),
        orderName: cart.length > 1 ? `${cart[0].name} 외 ${cart.length - 1}건` : cart[0].name,
        customerName: name,
        customerEmail: email,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });

    } catch (error) {
      console.error("결제 에러:", error);
      //실패하면 임시 저장한 거 지우기
      localStorage.removeItem('temp_order_info');

      if (error.code === 'USER_CANCEL') {
        alert("결제를 취소하셨습니다.");
      } else {
        alert(`결제 실패: ${error.message}`);
      }
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main className="content-section" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>장바구니가 비어있습니다.</h2>
        <a href="/shop" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'underline' }}>SHOP으로 돌아가기</a>
      </main>
    );
  }

  return (
    <main>
      <section id="checkout" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>

        {/* ★ [수정됨] 제목 스타일을 키우고 폰트를 적용했습니다. */}
        <h2 style={{
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '3.5rem', // 기존 2rem -> 3.5rem으로 대폭 확대
          fontFamily: 'var(--font-playfair), serif', // 우아한 폰트 적용
          fontWeight: 'bold'
        }}>
          Checkout
        </h2>

        <form className="checkout-form" onSubmit={handlePayment}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>이름</label>
            <input type="text" name="name" required style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>주소</label>
            <input type="text" name="address" required style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>이메일</label>
            <input type="email" name="email" required style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>

          <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #eee' }} />

          {/* 테스트 모드 안내창 */}
          <div style={{ padding: '20px', background: '#e8f0fe', textAlign: 'center', borderRadius: '8px', border: '1px solid #d2e3fc' }}>
            <p style={{ color: '#1a73e8', fontWeight: 'bold' }}>⚡ 테스트 모드 작동 중</p>
            <p style={{ margin: 0 }}>실제 상품 가격과 상관없이 <strong>100원</strong>만 결제됩니다.</p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <button
              type="submit"
              style={{
                width: '100%', padding: '20px',
                background: 'black', color: 'white', border: 'none',
                borderRadius: '5px', // 버튼 둥글게
                cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold'
              }}
            >
              {price.toLocaleString()}원 결제하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}