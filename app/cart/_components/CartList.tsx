'use client';
import React from 'react';
import { useAppDispatch } from '@/store/hook';
import { allDeleteCart, decrementToCart, delateToCart, incrementToCart } from '@/store/cart/cartSlice';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import Image from 'next/image';
import { CartItemType, TotalPriceType } from './CartLayout';

type CartListProps = {
    items: CartItemType[];  // ✅ 배열 타입
    calculateItemPrice: (item: TotalPriceType) => number;
};

const CartList = ({ items, calculateItemPrice }:CartListProps) => {
    const dispatch = useAppDispatch();
    
    return (
        <>
            <button 
                className='cart-reset'
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(allDeleteCart())
                }}
            >
                장바구니 비우기
            </button>
            <div className='cart'>
                {items.map((item) => (
                    <div key={item.cartId}>  
                        <div className='cart-top'>
                            <p className='cart-name'>{item.menuName}</p>
                            <button 
                                className='cart-close'
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(delateToCart(item.cartId))
                                }}
                            >
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                        <div className='cart-item'>
                            <div className='cart__image'>
                                <img src={item.img} alt={item.menuName} />
                            </div>
                            <div className='cart__detail'>
                                <ul className='cart__list'>
                                    {
                                        item.lightly && 
                                        (
                                            <li className='cart__list--item'><p className='cart__text'>연하게</p></li>
                                        )
                                    }
                                    <li className='cart__list--item'>
                                        <p className='cart__text'>기본가격</p>
                                        <p className='cart__text'>{item.price.toLocaleString()} 원</p>
                                    </li>
                                    {
                                        item.shot !== 0 && 
                                        (
                                            <li className='cart__list--item'>
                                                <p className='cart__text'>샷 추가</p>
                                                <p className='cart__text'>{item.shot} X 500원</p>
                                            </li>
                                        )
                                    }
                                    {
                                        item.syrup !== 0 && 
                                        (
                                            <li className='cart__list--item'>
                                                <p className='cart__text'>시럽 추가</p>
                                                <p className='cart__text'>{item.syrup} X 500원</p>
                                            </li>
                                        )
                                    }
                                    {
                                        item.whipping !== 0 &&
                                        (
                                            <li className='cart__list--item'>
                                                <p className='cart__text'>휘핑크림 추가</p>
                                                <p className='cart__text'>{item.whipping} X 500원</p>
                                            </li>
                                        )
                                    }
                                </ul>
                                <div className='cart__count-wrap'>
                                    <div className='cart__quantity-wrap'>
                                        <button className='cart-option__button' onClick={() => dispatch(incrementToCart(item.cartId))}>
                                            <Image src={plusIco} alt='플러스' />
                                        </button>
                                        <input className='cart-option__input' type="number" value={item.count} readOnly />
                                        <button className='cart-option__button' onClick={() => dispatch(decrementToCart(item.cartId))}>
                                            <Image src={minusIco} alt='마이너스' />
                                        </button>
                                    </div>
                                    <p className='cart__total-price'>
                                        {calculateItemPrice(item).toLocaleString()}원
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CartList;