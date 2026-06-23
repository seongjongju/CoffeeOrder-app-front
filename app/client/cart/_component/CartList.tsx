'use client';
import useCartQuery from '@/features/hooks/query/useCartQuery';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useState } from 'react';
import { formatPrice } from '@/app/util/format';

const CartList = () => {
    const { carts } = useCartQuery(); //카트 전체 조회
    
    return (
        <>
            <button 
                className='cart-reset'
            >
                장바구니 비우기
            </button>

            <div className='cart'>
                {
                    carts.map((item) => (
                        <div key={item._id}>
                            <div className='cart-top'>
                                <p className='cart-name'>{item.productName}</p>
                                <button 
                                    className='cart-close'
                                >
                                    <span></span>
                                    <span></span>
                                </button>
                            </div> {/* cart-top : end */}

                            <div className='cart-item'>
                                <div className='cart__image'>
                                    <CldImage 
                                        src={item.img.publicId}
                                        width={500}
                                        height={500}
                                        alt={item.img.imgName}
                                    />
                                </div>
                                <div className='cart__detail'>
                                    <ul className='cart__list'>
                                        <li className='cart__list--item'>
                                            <p className='cart__text'>기본가격</p>
                                            <p className='cart__text'>{item.price} 원</p>
                                        </li>
                                        {
                                            item.lightly && 
                                            (
                                                <li className='cart__list--item'>
                                                    <p className='cart__text'>연하게</p>
                                                </li>
                                            )
                                        }
                                        {
                                            item.addPrice.map((add) => {
                                                if(add.count === 0) return;
                                                return(
                                                    <li 
                                                        key={add.id}
                                                        className='cart__list--item'
                                                    >
                                                        <p className='cart__text'>{add.label}</p>
                                                        <p className='cart__text'>500 x {add.count}</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <div className='cart__count-wrap'>
                                        <div className='cart__quantity-wrap'>
                                            <button 
                                                className='cart-option__button'
                                            >
                                                <Image src={minusIco} alt='마이너스' />
                                            </button>
                                            <input className='cart-option__input' type="number" value={item.totalCount} readOnly />
                                            <button className='cart-option__button'>
                                                <Image src={plusIco} alt='플러스' />
                                            </button>
                                        </div>
                                        <p className='cart__total-price'>
                                            {formatPrice(item.totalPrice)}원
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default CartList;