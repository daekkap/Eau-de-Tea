import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">

                {/* 1. 브랜드 섹션 */}
                <div className="footer-section">
                    <h3 className="footer-logo">Eau de Tea</h3>
                    <p>
                        자연이 주는 가장 순수한 향기.<br />
                        당신의 일상에 쉼표를 선물합니다.
                    </p>
                </div>

                {/* 2. 빠른 링크 섹션 */}
                <div className="footer-section">
                    <h4>EXPLORE</h4>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/faqs">FAQs</Link></li>
                    </ul>
                </div>

                {/* 3. 연락처 섹션 */}
                <div className="footer-section">
                    <h4>CONTACT</h4>
                    <p>Email: daekkap@gmail.com</p>
                    <p>Tel: 010-9971-2054</p>
                    <p>Seoul, Republic of Korea</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Eau de Tea. All rights reserved.</p>
            </div>
        </footer>
    );
}