'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useParams } from 'next/navigation';

export default function Reviews() {
  const { id } = useParams();
  const productId = Number(id);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 입력 폼 상태 관리
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState(''); // ★ 비밀번호 상태 추가
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  // 1. 리뷰 불러오기
  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('리뷰 로딩 실패:', error);
      } else {
        setReviews(data);
      }
      setLoading(false);
    }
    if (productId) fetchReviews();
  }, [productId]);

  // 2. 리뷰 저장하기 (비밀번호 포함)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!text.trim() || !author.trim()) return alert('이름과 내용을 입력해주세요.');
    if (!password || password.length < 4) return alert('비밀번호를 4자리 이상 입력해주세요.');

    const newReview = {
      product_id: productId,
      author,
      password, // ★ 입력한 비밀번호 저장
      rating: Number(rating),
      text,
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert([newReview])
      .select();

    if (error) {
      alert('Review registration failed! 리뷰 등록에 실패했습니다');
      console.error(error);
    } else {
      if (data) setReviews([data[0], ...reviews]);
      
      // 입력창 초기화
      setAuthor('');
      setPassword(''); // 비밀번호 창도 초기화
      setText('');
      setRating(5);
      alert('Thank you for your review!');
    }
  };

  // ★ 3. 리뷰 삭제하기 (비밀번호 검증 로직)
  const handleDelete = async (reviewId) => {
    // 1. 사용자에게 비밀번호 입력받기
    const inputPassword = prompt('리뷰 등록 시 설정한 비밀번호를 입력하세요:');
    if (!inputPassword) return; // 취소하면 종료

    // 2. DB에서 삭제 시도 (ID와 비밀번호가 둘 다 맞아야 삭제됨)
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('password', inputPassword) // ★ 조건: 비밀번호가 일치해야 함
      .select();

    if (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
    } else if (data.length === 0) {
      // 삭제된 데이터가 없다면 = 비밀번호가 틀린 것
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      // 성공 시 화면에서도 제거
      setReviews(reviews.filter((r) => r.id !== reviewId));
      alert('리뷰가 삭제되었습니다.');
    }
  };

  const renderStars = (score) => '★'.repeat(score) + '☆'.repeat(5 - score);

  if (loading) return <div style={{textAlign:'center', padding:'20px', color:'#888'}}>리뷰를 불러오는 중...</div>;

  return (
    <div className="reviews-section">
      <h3>CUSTOMER REVIEWS ({reviews.length})</h3>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-row">
          {/* 이름 입력 */}
          <input 
            type="text" 
            placeholder="이름" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="review-input name-input"
            maxLength={10}
          />
          
          {/* ★ 비밀번호 입력 (4자리) */}
          <input 
            type="password" 
            placeholder="비밀번호(4자리)" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="review-input password-input"
            maxLength={4}
          />

          <select 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            className="review-input rating-select"
          >
            <option value="5">★★★★★ (5점)</option>
            <option value="4">★★★★☆ (4점)</option>
            <option value="3">★★★☆☆ (3점)</option>
            <option value="2">★★☆☆☆ (2점)</option>
            <option value="1">★☆☆☆☆ (1점)</option>
          </select>
        </div>

        <textarea 
          placeholder="이 상품에 대한 솔직한 리뷰를 남겨주세요." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="review-input text-input"
        ></textarea>
        <button type="submit" className="submit-review-btn">리뷰 등록</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p style={{textAlign:'center', color:'#999', padding:'30px'}}>
            당신이 첫 번째 리뷰의 주인공이 되어보세요
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-stars">{renderStars(review.rating)}</span>
                
                <div className="review-meta-group">
                  <span className="review-meta">
                    <strong>{review.author}</strong> · {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  
                  {/* ★ 삭제 버튼 (X) */}
                  <button 
                    onClick={() => handleDelete(review.id)}
                    className="delete-btn"
                    title="리뷰 삭제"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))
        )}
      </div>

      {/* 스타일 추가 */}
      <style jsx>{`
        .review-meta-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .password-input {
          flex: 1; /* 이름, 비밀번호, 별점이 적절히 공간 나눔 */
        }
        .delete-btn {
          background: none;
          border: none;
          color: #ccc;
          cursor: pointer;
          font-size: 14px;
          padding: 0 5px;
          transition: color 0.2s;
        }
        .delete-btn:hover {
          color: #ff4444; /* 마우스 올리면 빨간색 */
        }
      `}</style>
    </div>
  );
}