import './globals.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';

// 1. 구글 폰트 가져오기 (Next.js 내장 기능)
import { Noto_Sans_KR, Playfair_Display } from 'next/font/google';

// 2. 폰트 설정
const notoSansKr = Noto_Sans_KR({ 
  subsets: ['latin'], // 한글은 기본 포함됨
  weight: ['300', '400', '500', '700'], // 얇은 것부터 두꺼운 것까지
  variable: '--font-noto', // CSS 변수로 저장
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
      {/* 3. body 태그에 폰트 클래스 적용 */}
      <body className={`${notoSansKr.className} ${playfair.variable}`}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}