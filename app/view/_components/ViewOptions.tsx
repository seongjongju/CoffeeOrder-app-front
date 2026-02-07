'use client';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import useOptions from '@/features/hooks/view/useOptions';
import { useAppSelector } from '@/store/hook';
import React from 'react';
import Image from 'next/image';

interface viewOptionsType {
    type: string,
};

const ViewOptions = ({ type }:viewOptionsType) => {
    const { lightly, shot, syrup, whipping } = useAppSelector(state => state.option);
    //옵션 선택 커스텀 훅
    const {
        handleChangelightly,
        shotIncrement,
        shotDecrement,
        syrupIncrement,
        syrupDecrement,
        whippingIncrement,
        whippingDecrement,
    } = useOptions();

    return (
        <>
            <p className='view-title'>옵션</p>
            {/* 커피 일 때만 연하게 옵션 노출 */}
            {
                type === "iceCoffee" || type === "hotCoffee" ?
                (
                    <div className='view-option__density'>
                        <p className='text-body'>
                            연하게
                        </p>   
                        <label className='label'>
                            <div className='all-checked-custom'>
                                <input
                                    className='checked-input' 
                                    type='checkbox'
                                    checked={lightly}
                                    onChange={handleChangelightly}
                                />
                                <span className='checked-show-hide'></span>
                            </div>
                        </label>
                    </div> 
                ) : null
            }

            {/* 디저트류 일 경우 샷추가 옵션 노출 X */}
            {
                type !== "dessert" &&
                (
                    <div className='view-option'>
                        <p className='text-body'>
                            샷추가 <span>+500</span>
                        </p>
                        <div className='view-option__quantity-wrap'>
                            <button 
                                className='view-option__button'
                                onClick={shotIncrement}
                            >
                                <Image src={plusIco} alt='플러스버튼' />
                            </button>
                            <input 
                                className='view-option__input'
                                type="number" 
                                value={shot}
                                readOnly
                            />
                            <button 
                                className='view-option__button'
                                onClick={shotDecrement}
                            >
                                <Image src={minusIco} alt='마이너스버튼' />
                            </button>
                        </div> {/* view-option__quantity-wrap */}
                    </div> 
                )
            }

            <div className='view-option'>
                <p className='text-body'>
                    시럽 추가 <span>+500</span>
                </p>
                <div className='view-option__quantity-wrap'>
                    <button 
                        className='view-option__button'
                        onClick={syrupIncrement}
                    >
                        <Image src={plusIco} alt='플러스버튼' />
                    </button>
                    <input 
                        className='view-option__input'
                        type="number" 
                        value={syrup}
                        readOnly
                    />
                    <button 
                        className='view-option__button'
                        onClick={syrupDecrement}
                    >
                        <Image src={minusIco} alt='마이너스버튼' />
                    </button>
                </div> {/* view-option__quantity-wrap */}
            </div> {/* view-option */}

            <div className='view-option'>
                <p className='text-body'>
                    휘핑크림 추가 <span>+500</span>
                </p>
                <div className='view-option__quantity-wrap'>
                    <button 
                        className='view-option__button'
                        onClick={whippingIncrement}
                    >
                        <Image src={plusIco} alt='플러스버튼' />
                    </button>
                    <input 
                        className='view-option__input'
                        type="number" 
                        value={whipping}
                        readOnly
                    />
                    <button 
                        className='view-option__button'
                        onClick={whippingDecrement}
                    >
                        <Image src={minusIco} alt='마이너스버튼' />
                    </button>
                </div> {/* view-option__quantity-wrap */}
            </div> {/* view-option */}
        </>
    );
};

export default ViewOptions;