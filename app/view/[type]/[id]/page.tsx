'use client';
import useMenu from '@/app/api/hook/useMenu';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import '@/shared/styled/view/view.css';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React from 'react';

const ViewPage = () => {
    const params = useParams();
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();

    //전체메뉴
    const menus = [...iceCoffeeState, ...hotCoffeeState, ...juiceState, ...dessertState];

    //타입 필터
    const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
    const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    return (
        <main className='main'>
            <div className='inner'>
                <div className='view-thum'>
                    <img src={menuIdFind?.img} alt={menuIdFind?.menuname} className='view-thum_-image' />
                    <p className='view-thum__title'>{menuIdFind?.menuname}</p>
                </div> {/* view-thum */}

                <p className='view-title'>옵션</p>
                <div className='view-option'>
                    <p className='text-body'>
                        샷추가 <span>+500</span>
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button className='view-option__button'>
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            min="0"
                            max="100"
                        />
                        <button className='view-option__button'>
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}

                <div className='view-option'>
                    <p className='text-body'>
                        시럽 추가 <span>+500</span>
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button className='view-option__button'>
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            min="0"
                            max="100"
                        />
                        <button className='view-option__button'>
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}

                <div className='view-option'>
                    <p className='text-body'>
                        휘핑크림 추가 <span>+1000</span>
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button className='view-option__button'>
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            min="0"
                            max="100"
                        />
                        <button className='view-option__button'>
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}
            </div>
        </main>
    );
};

export default ViewPage;