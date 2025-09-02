import React from 'react';
import cartStyles from '@/features/cart/cart.module.css';
import CartItems from '@/features/cart/components/CartItems';
import buttonStyles from '@/shared/components/Form/Button/Button.module.css';

const CartPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <button className={cartStyles.cart_clear}>장바구니 비우기</button>
                    <CartItems />
                    <CartItems />
                    <button className={buttonStyles.common_button}>9,000원 주문하기 총 2개</button>
                </div>
            </section>
        </main>
    );
};

export default CartPage;