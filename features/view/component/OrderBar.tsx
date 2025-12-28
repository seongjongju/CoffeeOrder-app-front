'use client';
import '@/shared/styled/view/view.css';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useState } from 'react';

interface optionType {
    shot: number;
    syrup: number;
    whipping: number;
    lightly: boolean;
    price: number;
};

const OrderBar = ({ shot, syrup, whipping, lightly, price }: optionType) => {
    const [count, setCount] = useState<number>(1); // 갯수

    //갯수 * 가격 + 옵션들
    const totalPrice = (price * count) + (shot * 500) + (syrup * 500) + (whipping * 500);

    return (
        <div className='order-bar'>
            {
                shot !== 0 || syrup !== 0 || whipping !== 0 || lightly ? (
                    <div className='order-bar__options'>
                        {
                            lightly && 
                            (
                                <p className='order-bar__option'>
                                    연하게
                                </p>
                            )
                        }
                        {
                            shot !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    샷 추가 X <span>{shot}</span>
                                </p>
                            ) : null
                        }
                        {
                            syrup !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    시럽 추가 X <span>{syrup}</span>
                                </p>
                            ) : null
                        }
                        {
                            whipping !== 0 ? 
                            (
                                <p className='order-bar__option'>
                                    휘핑크림 추가 X <span>{whipping}</span>
                                </p>
                            ) : null
                        }
                    </div>
                ) : null
            }
            
            <form className='order-bar__form'>
                <div className='view-option'>
                    <p className='order-bar__price'>
                        Total : {totalPrice.toLocaleString()}원
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                if(count < 10) setCount(prev => prev + 1);
                                else return;
                            }}
                        >
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            value={count}
                            readOnly
                        />
                        <button 
                            className='view-option__button'
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                if(count > 1) setCount(prev => prev - 1);
                                else return;
                            }}
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}
                <div className='order-bar__btns'>
                    <button className='order-bar__button--cart'>장바구니</button>
                    <button className='order-bar__button--order'>주문하기</button>
                </div> {/* order-bar__btns */}
            </form> {/* order-bar__form */}
        </div>
    );
};

export default OrderBar;