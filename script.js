document.addEventListener('DOMContentLoaded', () => {
    const cartCountSpan = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // 현재 페이지의 장바구니 아이템 수 (페이지 이동 시 초기화됨)
    let cartItemCount = 0;

    // 장바구니 담기 버튼 클릭 이벤트
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItemCount++;
            cartCountSpan.textContent = cartItemCount;

            // 간단한 애니메이션 효과
            cartCountSpan.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountSpan.style.transform = 'scale(1)';
            }, 150);
        });
    });
});