import Link from 'next/link';

export const metadata = {
  title: 'Eau de Tea | 주문 완료',
};

export default function OrderCompletePage() {
  return (
    <main>
      <section id="order-complete" className="order-complete-container">
        <h2>주문 완료</h2>
        <p>주문해 주셔서 감사합니다.</p>
        <p>주문 처리가 시작되었으며, 곧 배송이 시작될 예정입니다.</p>
        <Link href="/" className="checkout-btn">
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
