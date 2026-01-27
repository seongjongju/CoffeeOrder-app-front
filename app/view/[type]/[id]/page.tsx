'use client';
import useMenu from '@/features/menu/hook/useMenu';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import '@/shared/styled/view/view.css';
import '@/shared/styled/policyStyle/policyStyle.css';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import OrderBar from '@/features/view/component/OrderBar';
import useOptions from '@/features/view/hook/useOptions';
import { useAppSelector } from '@/app/store/hook';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import useLoading from '@/shared/components/loading/hook/useLoading';

const ViewPage = () => {
    const {isLoading} = useLoading();
    const params = useParams();
    const {menus} = useMenu(); // 메뉴 커스텀 훅
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

    //타입 필터
    const menuTypeFiltered = menus.filter(menu => menu.type === params.type)

    //타입이 일치하면 고유 아이디 찾기
    const menuIdFind = menuTypeFiltered.find(menu => menu.id === Number(params.id));

    {
        if(menuIdFind === undefined || isLoading) 
        return (<LoadingUi />)
    }
    
    return (
        <main className='main' style={{ paddingBottom: "0" }}>
            <div className='inner'>
                <div className='view-thum'>
                    <img src={menuIdFind?.img} alt={menuIdFind?.menuname} className='view-thum__image' />
                    <p className='view-thum__title'>{menuIdFind?.menuname}</p>
                </div> {/* view-thum */}

                <p className='view-title'>옵션</p>
                {/* 커피 일 때만 연하게 옵션 노출 */}
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
                    menuIdFind?.type !== "dessert" &&
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

                <div className='view-detail'>
                    <p className='view-title'>상세정보</p>
                    <p className='view-detail__heading'>영양 - 1회 제공량 기준</p>
                    <table className='view-detail__table'>
                        <tbody>
                            <tr>
                                <th>용량 (ml)</th>
                                <td>{menuIdFind?.info.volume}</td>
                                <th>카페인 (mg)</th>
                                <td>
                                    {
                                        menuIdFind?.info.caffeine ? menuIdFind?.info.caffeine
                                        : "-"
                                    }
                                </td>
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
                                    
                    {/* 원산지 표기가 있을 경우에만 노출 */}
                    {
                        menuIdFind?.origin &&  
                        (
                            <div className='origin'>
                                <p className='view-detail__heading'>원산지</p>
                                <p className='view-detail__text'>{menuIdFind?.origin}</p>
                            </div>
                        )
                    }
                </div> {/* view-detail */}
            </div>
            <OrderBar 
                menuName={menuIdFind.menuname}
                img={menuIdFind.img}
                menuId={menuIdFind.id}
            />
        </main>
    );
};

export default ViewPage;