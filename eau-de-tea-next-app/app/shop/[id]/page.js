'use client';

import Image from 'next/image';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { notFound } from 'next/navigation';
// ★ 1. Reviews 컴포넌트 불러오기 (이미 잘 적어두셨네요!)
import Reviews from '../../components/Reviews';

export default function ProductDetail({ params }) {
    // URL의 id(숫자)에 맞는 상품 찾기
    const id = Number(params.id);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return notFound();
    }

    const { addToCart } = useCart();

    return (
        <div className="content-section">
            <div className="product-detail-container">
                {/* 왼쪽 이미지 */}
                <div className="detail-image-wrapper">
                    <div className="product-image-placeholder">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="product-image"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }} 
                        />
                    </div>
                </div>

                {/* 오른쪽 정보 */}
                <div className="detail-info-wrapper">
                    <h1 className="detail-title">{product.name}</h1>
                    <p className="detail-price">₩ {product.price.toLocaleString()}</p>
                    <p className="detail-desc">{product.description}</p>
                    <hr style={{ margin: '20px 0', opacity: 0.2 }} />
                    <p className="detail-text">{product.detail}</p>

                    <button
                        className="add-to-cart-btn"
                        onClick={() => {
                            addToCart(product);
                            alert(`${product.name}이(가) 장바구니에 담겼습니다.`);
                        }}
                        style={{ marginTop: '30px' }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* ★ 2. 여기에 리뷰 섹션 추가! (상품 정보 박스 밑에) */}
            <hr style={{ margin: '80px 0', border: 'none', borderTop: '1px solid #eee' }} />
            
            {/* 리뷰 컴포넌트 배치 */}
            <Reviews />

        </div>
    );
}