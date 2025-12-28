'use client';
import useMenu from '@/app/api/hook/useMenu';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import '@/shared/styled/view/view.css';
import '@/shared/styled/policyStyle/policyStyle.css';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { useEffect, useState } from 'react';
import OrderBar from '@/features/view/component/OrderBar';

const ViewPage = () => {
    const params = useParams();
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
    const [lightly, setLightly] = useState<boolean>(false); //연하게 옵션
    const [shot, setShot] = useState<number>(0); // 샷추가
    const [syrup, setSyrup] = useState<number>(0); // 시럽 추가
    const [whipping, setWhipping] = useState<number>(0); // 휘핑크림 추가
    const [price, setPrice] = useState<number>(0) // 가격

    //전체메뉴
    const menus = [...iceCoffeeState, ...hotCoffeeState, ...juiceState, ...dessertState];

    //타입 필터
    const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
    const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    //가격 렌더링
    useEffect(() => {
        if (!menuIdFind) return;
        setPrice(menuIdFind.price);
    }, [menuIdFind])

    return (
        <main className='main' style={{ paddingBottom: "0" }}>
            <div className='inner'>
                <div className='view-thum'>
                    <img src={menuIdFind?.img} alt={menuIdFind?.menuname} className='view-thum_-image' />
                    <p className='view-thum__title'>{menuIdFind?.menuname}</p>
                </div> {/* view-thum */}

                <p className='view-title'>옵션</p>
                {
                    menuIdFind?.type === "iceCoffee" || menuIdFind?.type === "hotCoffee" ? 
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
                                        onChange={() => setLightly(prev => !prev)}
                                    />
                                    <span className='checked-show-hide'></span>
                                </div>
                            </label>
                        </div> 
                    ) : null
                }
                <div className='view-option'>
                    <p className='text-body'>
                        샷추가 <span>+500</span>
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            onClick={() => {
                                if(shot < 10) setShot(prev => prev + 1);
                                else return;
                            }}
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
                            onClick={() => {
                                if(shot > 0) setShot(prev => prev - 1);
                                else return;
                            }}
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}

                <div className='view-option'>
                    <p className='text-body'>
                        시럽 추가 <span>+500</span>
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            onClick={() => {
                                if(syrup < 10) setSyrup(prev => prev + 1);
                                else return;
                            }}
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
                            onClick={() => {
                                if(syrup > 0) setSyrup(prev => prev - 1);
                                else return;
                            }}
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
                            onClick={() => {
                                if(whipping < 10) setWhipping(prev => prev + 1);
                                else return;
                            }}
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
                            onClick={() => {
                                if(whipping > 0) setWhipping(prev => prev - 1);
                                else return;
                            }}
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}

                <div className='view-detail'>
                    <p className='view-title'>상세정보</p>
                    <p className='view-detail__heading'>영양 - 1회 제공량 기준</p>
                    <table className='view-detail__table'>
                        <tbody>
                            <tr>
                                <th>용량 (ml)</th>
                                <td>{menuIdFind?.info.volume}</td>
                                <th>카페인 (mg)</th>
                                <td>{menuIdFind?.info.caffeine}</td>
                            </tr>
                            <tr>
                                <th>칼로리</th>
                                <td>{menuIdFind?.info.calorie}</td>
                                <th>나트륨 (mg)</th>
                                <td>{menuIdFind?.info.sodium}</td>
                            </tr>
                            <tr>
                                <th>탄수화물 (g)</th>
                                <td>{menuIdFind?.info.carbohydrate}</td>
                                <th>당류 (g)</th>
                                <td>{menuIdFind?.info.sugar}</td>
                            </tr>
                            <tr>
                                <th>단백질 (g)</th>
                                <td>{menuIdFind?.info.protein}</td>
                                <th>포화지방 (g)</th>
                                <td>{menuIdFind?.info.saturatedfat}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='view-detail__heading'>원산지</p>
                    <p className='view-detail__text'>{menuIdFind?.origin}</p>
                </div> {/* view-detail */}
            </div>
            <OrderBar 
                price={price}
                shot={shot}
                syrup={syrup}
                whipping={whipping}
                lightly={lightly}
            />
        </main>
    );
};

export default ViewPage;