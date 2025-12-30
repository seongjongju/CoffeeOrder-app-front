'use client';
import React, { useState } from 'react';
import '@/shared/styled/cart/cart.css';
import { useAppSelector } from '../store/hook';
import { RootState } from '../store/store';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import Image from 'next/image';
import useOptions from '@/features/view/hook/useOptions';

    type TotalPriceType = {
        price: number,
        shot: number,
        syrup: number,
        whipping: number,
        count: number
    };


const CartPage = () => {
    const cartItems = useAppSelector((state: RootState) => state.cart); //장바구니 메뉴 배열
    const [changeCount, setChangeCount] = useState<number>(0);// 수량 조절용

    //가격
    const totalPrice = ({price, shot, syrup, whipping, count}:TotalPriceType) => {
        return (price * count) + (shot * 500) + (syrup * 500) + (whipping * 500);
    };

    //수량 조절을 위해 배열에서 고유 아이디만 추출
    const cartItemId = cartItems.items.map((item) => item.cartId);
    
    return (
        <main 
            className='main' 
            style={{ 
                backgroundColor: "#F5F5F5",
                maxHeight: "100vh",
                minHeight: "100vh"
            }}
        >
            <div 
                className='inner'
                style={{
                    height: "calc(100vh - 78px - 30px)"
                }}
            >
                <button className='cart-reset'>장바구니 비우기</button>
                <div className='cart'>
                    {/* 장바구니에 쌓인 메뉴들을 리스트 형식으로 보여준다. */}
                    {
                        cartItems.items.map((item) => (
                            <div key={item.cartId}>  
                                <div className='cart-top'>
                                    <p className='cart-name'>{item.menuName}</p>
                                    <button className='cart-close'>
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
                                                    <li className='cart__list--item'>
                                                        <p className='cart__text'>연하게</p>
                                                    </li>
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
                                                <button 
                                                    className='cart-option__button'
                                                >
                                                    <Image src={plusIco} alt='플러스버튼' />
                                                </button>
                                                <input 
                                                    className='cart-option__input'
                                                    type="number" 
                                                    value={item.count}
                                                    readOnly
                                                />
                                                <button 
                                                    className='cart-option__button'
                                                >
                                                    <Image src={minusIco} alt='마이너스버튼' />
                                                </button>
                                            </div>

                                            <p className='cart__total-price'>
                                                {
                                                    totalPrice({
                                                        price: item.price,
                                                        shot: item.shot,
                                                        syrup: item.syrup,
                                                        whipping: item.whipping,
                                                        count: item.count,
                                                    }).toLocaleString()
                                                }원
                                            </p>
                                        </div>
                                    </div>  {/* cart__detail */}
                                </div>
                            </div>
                        ))
                    }
                </div> {/* cart */}
            </div> {/* inner */}
        </main>
    );
};

export default CartPage;