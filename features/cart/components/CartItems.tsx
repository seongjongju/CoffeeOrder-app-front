import React from 'react';
import cartStyles from '../cart.module.css';
import Image from 'next/image';
import newHotImg1 from '@/shared/assets/images/contents/newhot_img1.svg';
import clearIco from '@/shared/assets/images/ico/clear_ico.svg';

const CartItems = () => {
    return (
        <div className={cartStyles.cart_item}>
            <button className={cartStyles.cart_item_remove}>
                <Image src={clearIco} alt='제품 삭제' />
            </button>
            <div className={cartStyles.cart_item_image}>
                <Image src={newHotImg1} alt='제품 이미지' />
            </div>
            <div className={cartStyles.cart_info_wrap}>
                <div className={cartStyles.cart_info}>
                    <p className={cartStyles.cart_item_name}>딸기라떼</p>
                    <p className={cartStyles.cart_item_price}>4,000원</p>
                </div>
                <div className={cartStyles.cart_info}>
                    <p className={cartStyles.cart_item_option}>시럽</p>
                    <p className={cartStyles.cart_item_addition}>500원 - 1</p>
                </div>
                <div className={cartStyles.cart_number_wrap}>
                    <div className={cartStyles.cart_number}>
                        <button style={{ lineHeight: 1 }}>+</button>
                        <p>1</p>
                        <button>-</button>
                    </div>
                    <p className={cartStyles.total_price}>4,500원</p>
                </div>
            </div>
        </div>
    );
};

export default CartItems;