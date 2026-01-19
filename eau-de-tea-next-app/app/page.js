export const metadata = {
  title: 'Eau de Tea | Official Site',
};

export default function HomePage() {
  return (
    <main>
      <section id="home">
        <div className="hero-background">
          <div className="hero-text">
            <h1>최고의 순간을 위한 한 잔</h1>
            <p>엄선된 찻잎으로 만든 프리미엄 티백을 만나보세요.</p>
          </div>
        </div>
      </section>

      <section id="description" className="content-section">
        <h2>향기의 예술, Eau de Tea</h2>
        <p>
          Eau de Tea는 차의 본질적인 향과 맛을 가장 순수하게 담아내기 위해 탄생했습니다. 
          우리는 전 세계의 유명 차 산지에서 직접 공수한 최상급 찻잎만을 고집하며,
          각 차가 가진 고유의 이야기를 당신의 찻잔에 오롯이 전달하고자 합니다.
        </p>
      </section>

      <section id="product-intro" className="content-section">
        <h2>우리의 대표 상품</h2>
        <p>
          얼그레이 클래식의 깊고 부드러운 향부터 캐모마일 가든의 편안한 휴식까지, 
          Eau de Tea의 모든 제품은 최고의 맛과 향을 위한 여정의 결과물입니다. 
          당신의 일상에 특별한 순간을 더해줄 완벽한 차를 만나보세요.
        </p>
      </section>
    </main>
  );
}