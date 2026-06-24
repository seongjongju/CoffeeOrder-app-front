import React from 'react';
import './_styled/cart.css';
import CartList from './_component/CartList';

const CartPage = () => {
    return (
        <main 
            className='main cart-main'
        >
            <CartList />
        </main>
    );
};

export default CartPage;