import './globals.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer'; // ★ 1. Footer 컴포넌트 불러오기

// 구글 폰트 설정 (기존 코드 유지)
import { Noto_Sans_KR, Playfair_Display } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Eau de Tea | Premium Tea Shop',
  description: '최상의 찻잎으로 우려낸 프리미엄 티를 경험하세요.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} ${playfair.variable}`}>
        <CartProvider>
          {/* 상단 헤더 */}
          <Header />

          {/* 메인 콘텐츠 (페이지마다 바뀌는 부분) */}
          {children}

          {/* ★ 2. 하단 푸터 추가 (모든 페이지 맨 밑에 보임) */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}