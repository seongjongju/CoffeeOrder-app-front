'use client';
import '@/shared/styled/cart/cart.css';
import { useAppDispatch } from '../store/hook';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import Image from 'next/image';
import mascot from '@/public/images/mascot.png';
import { allDeleteCart, decrementToCart, delateToCart, incrementToCart } from '@/features/cart/store/cartSlice';
import useLoading from '@/shared/components/loading/hook/useLoading';
import LoadingUi from '@/shared/components/loading/LoadingUi';
import useCartQuantity from '@/features/cart/hook/useCartQuantity';

type TotalPriceType = {
    price: number,
    shot: number,
    syrup: number,
    whipping: number,
    count: number
};

const CartPage = () => {
    const {isLoading} = useLoading();
    const {cartItems, cartTotalCount} = useCartQuantity();
    const dispatch = useAppDispatch();

    //가격
    const totalPrice = ({price, shot, syrup, whipping, count}:TotalPriceType) => {
        const OPTION_PRICE = 500;

        const optionPrice = (shot + syrup + whipping) * OPTION_PRICE;

        return (price + optionPrice) * count;
    }; 

    if(isLoading) return <LoadingUi />
    
    return (
        <main 
            className={
                cartItems.items.length !== 0 ? 'main cart-main' : 'main cart-null'
            } 
        >
            <div 
                className='inner cart-inner'>
                <button 
                    className='cart-reset'
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        dispatch(allDeleteCart())
                    }}
                >
                    장바구니 비우기
                </button>
                <div className='cart'>
                    {/* 장바구니에 쌓인 메뉴들을 리스트 형식으로 보여준다. */}
                    {
                        cartItems.items.map((item) => (
                            <div key={item.cartId}>  
                                <div className='cart-top'>
                                    <p className='cart-name'>{item.menuName}</p>
                                    <button 
                                        className='cart-close'
                                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
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
                                                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                                        e.preventDefault();
                                                        dispatch(incrementToCart(item.cartId))
                                                    }}
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
                                                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                                        e.preventDefault();
                                                        dispatch(decrementToCart(item.cartId))
                                                    }}
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
                <button className='common-button' style={{ marginTop: "10px" }}>
                    주문하기 <span className='totla-length'>총 {cartTotalCount}개</span>
                </button>
            </div> {/* inner */}
            
            {
                cartItems.items.length !== 0 ? null : 
                (
                    <div className='cart-null__ui'>
                        <Image  src={mascot} alt='머그컵 캐릭터' />
                        <p className='cart-null__text'>
                            장바구니가 
                            비었어요!!
                        </p>
                    </div>
                )
            }
        </main>
    );
};

export default CartPage;