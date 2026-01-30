'use client';

import { useState } from 'react';

export default function Reviews() {
  // 초기 가짜 데이터 (빈 화면이 심심하지 않게)
  const [reviews, setReviews] = useState([
    { id: 1, author: '김차음', rating: 5, date: '2026.01.28', text: '향이 너무 좋아서 매일 마시고 있어요. 포장도 고급스럽네요!' },
    { id: 2, author: 'TeaLover', rating: 4, date: '2026.01.29', text: '배송도 빠르고 맛도 깔끔합니다. 재구매 의사 있습니다.' },
  ]);

  // 폼 입력 상태 관리
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  // 리뷰 등록 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return alert('이름과 내용을 입력해주세요.');

    const newReview = {
      id: Date.now(),
      author,
      rating: Number(rating),
      date: new Date().toLocaleDateString('ko-KR'), // 오늘 날짜
      text,
    };

    setReviews([newReview, ...reviews]); // 새 리뷰를 맨 위에 추가
    setAuthor('');
    setText('');
    setRating(5);
  };

  // 별점 렌더링 도우미 함수 (숫자 -> ★★★☆☆)
  const renderStars = (score) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  };

  return (
    <div className="reviews-section">
      <h3>CUSTOMER REVIEWS ({reviews.length})</h3>

      {/* 1. 리뷰 입력 폼 */}
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="이름" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="review-input name-input"
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

      {/* 2. 리뷰 리스트 */}
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="review-stars">{renderStars(review.rating)}</span>
              <span className="review-meta">
                <strong>{review.author}</strong> · {review.date}
              </span>
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}