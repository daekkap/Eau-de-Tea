'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function FailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const message = searchParams.get('message');
  const code = searchParams.get('code');

  return (
    <div className="content-box">
      <h1 className="icon">😢</h1>
      <h2 className="title">결제에 실패했습니다.</h2>
      <p className="desc">주문이 완료되지 않았습니다.</p>

      <div className="error-card">
        <div className="error-row">
          <span className="label">오류 코드</span>
          <span className="value">{code}</span>
        </div>
        <div className="error-row">
          <span className="label">사유</span>
          <span className="value">{message}</span>
        </div>
      </div>

      <div className="button-group">
        <button onClick={() => router.push('/checkout')} className="btn primary">
          다시 결제하기
        </button>

        <button onClick={() => router.push('/shop')} className="btn secondary">
          쇼핑몰로 돌아가기
        </button>
      </div>

      <style jsx>{`
        .content-box { max-width: 600px; width: 100%; margin: 0 auto; }
        .icon { font-size: 3rem; margin-bottom: 20px; }
        .title { margin-bottom: 10px; font-size: 1.8rem; color: #ff4444; }
        .desc { color: #666; margin-bottom: 40px; }

        .error-card {
          background: #fff0f0;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 40px;
          border: 1px solid #ffcccc;
          text-align: left;
        }
        .error-row { margin-bottom: 10px; font-size: 0.95rem; }
        .error-row:last-child { margin-bottom: 0; }
        .label { font-weight: bold; margin-right: 10px; display: inline-block; min-width: 70px; }
        .value { color: #333; word-break: break-all; }

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
        .btn.secondary { background: white; color: black; border: 1px solid #ddd; }

        /* ★ 모바일 스타일 */
        @media (max-width: 768px) {
          .icon { font-size: 2.5rem; }
          .title { font-size: 1.5rem; }
          
          .error-card { padding: 20px; }
          .error-row { display: flex; flex-direction: column; gap: 5px; }
          
          /* 버튼 세로 배치 */
          .button-group { flex-direction: column; }
          .btn { width: 100%; padding: 18px; }
        }
      `}</style>
    </div>
  );
}

export default function FailPage() {
  return (
    <main style={{
      padding: '100px 20px',
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <FailContent />
      </Suspense>
      {/* FailPage의 메인 컨테이너 모바일 여백 조정 */}
      <style jsx>{`
        @media (max-width: 768px) {
          main { padding: 60px 20px !important; }
        }
      `}</style>
    </main>
  );
}