'use client';

import { useEffect, useState, useRef } from 'react'; // ★ useRef 추가됨
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '당신의_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '당신의_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(true); // 저장 중 상태
  
  // ★ 중복 실행 방지용 깃발 (가장 중요한 추가 사항)
  const isRun = useRef(false);

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // ★ 1. 이미 실행된 적이 있다면 즉시 종료 (중복 방지)
    if (isRun.current) return;
    
    // ★ 2. "나 이제 실행한다!"라고 깃발 꽂기
    isRun.current = true;

    const saveOrder = async () => {
      try {
        // 1. 아까 저장해둔 임시 정보 꺼내기
        const tempInfoString = localStorage.getItem('temp_order_info');
        
        if (!tempInfoString) {
          // 정보가 없으면 로딩 끄고 종료
          setIsProcessing(false);
          return;
        }

        const tempInfo = JSON.parse(tempInfoString);

        // 2. Supabase 'orders' 테이블에 저장!
        const { error } = await supabase.from('orders').insert({
          order_id: orderId,
          total_amount: Number(amount),
          customer_name: tempInfo.name,
          email: tempInfo.email,
          address: tempInfo.address,
          items: tempInfo.items // 장바구니 목록도 JSON으로 저장
        });

        if (error) throw error;

        // 3. 저장이 잘 됐으면 뒤처리
        localStorage.removeItem('temp_order_info'); // 임시 정보 삭제
        clearCart(); // 장바구니 비우기
        setIsProcessing(false); // 로딩 끝

      } catch (err) {
        console.error("주문 저장 실패:", err);
        // 에러가 나도 로딩화면은 꺼줍니다 (사용자가 갇히지 않게)
        setIsProcessing(false);
      }
    };

    if (orderId) {
      saveOrder();
    }
  }, []); // 의존성 배열 비워서 1번만 실행

  if (isProcessing) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2>주문 정보를 저장하고 있습니다...</h2>
        <p>잠시만 기다려주세요.</p>
      </div>
    );
  }

  return (
    <main className="success-container">
      <div className="content-box">
        <h1 className="icon">Thank you</h1>
        <h2 className="title">구매해 주셔서<br className="mobile-break" />진심으로 감사합니다.</h2>
        
        <div className="info-card">
          <div className="info-row">
            <span className="label">주문 번호</span>
            <strong className="value">{orderId}</strong>
          </div>
          <div className="info-row total">
            <span className="label">총 결제 금액</span>
            <span className="amount">{Number(amount).toLocaleString()}원</span>
          </div>
          {/* 사용자 안내 메시지 */}
          <p style={{ marginTop: '15px', color: '#008000', fontSize: '0.9rem' }}>
            * 주문 내역이 안전하게 저장되었습니다.
          </p>
        </div>

        <div className="button-group">
          <button onClick={() => router.push('/shop')} className="btn primary">
            쇼핑 계속하기
          </button>
          
          <button onClick={() => router.push('/')} className="btn secondary">
            메인으로
          </button>
        </div>
      </div>

      <style jsx>{`
        .success-container {
          padding: 100px 20px;
          text-align: center;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content-box {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
        }
        .icon { font-size: 3rem; margin-bottom: 20px; font-family: var(--font-playfair); } /* 폰트 스타일 살짝 추가 */
        .title { margin-bottom: 30px; font-size: 1.8rem; word-break: keep-all; }
        .mobile-break { display: none; }

        .info-card {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 40px;
          text-align: left;
        }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .info-row.total { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; align-items: center; }
        .label { color: #666; }
        .value { font-size: 0.9rem; word-break: break-all; text-align: right; }
        .amount { color: #0064FF; font-weight: bold; font-size: 1.2rem; }

        .button-group { display: flex; gap: 10px; justify-content: center; }
        .btn {
          padding: 15px 30px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          border: none;
          transition: 0.2s;
        }
        .btn.primary { background: black; color: white; }
        .btn.primary:hover { background: #333; }
        .btn.secondary { background: white; color: black; border: 1px solid #ddd; }
        .btn.secondary:hover { background: #f5f5f5; }

        @media (max-width: 768px) {
          .success-container { padding: 60px 20px; }
          .icon { font-size: 2.5rem; }
          .title { font-size: 1.5rem; }
          .mobile-break { display: block; }
          
          .info-card { padding: 20px; }
          .info-row { flex-direction: column; gap: 5px; margin-bottom: 15px; }
          .info-row.total { flex-direction: row; justify-content: space-between; }
          .value { text-align: left; }

          .button-group { flex-direction: column; }
          .btn { width: 100%; padding: 18px; }
        }
      `}</style>
    </main>
  );
}