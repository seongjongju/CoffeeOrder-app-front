'use client';
import React, { useCallback, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import { formatPrice } from '@/app/util/format';
import { Cart } from '@/app/types/carts/carts';
import { deleteCartApi, updateCartApi } from '@/features/clientApi/cartApi';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import { useQueryClient } from '@tanstack/react-query';

interface CartItemProps {
    cartItem: Cart;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartItem = ({cartItem, setIsLoading}: CartItemProps) => {
    const { modalShow, setModalShow, modalText, setModalText } = useModalShow();
    const [cartCount, setCartCount] = useState<number>(cartItem.totalCount); //장바구니 메뉴 수량 변경
    const [cartItemTotalPrice, setCartItemTotalPrice] = useState<number>(cartItem.totalPrice); //장바구니 메뉴  총가격 변경

    const queryClient = useQueryClient(); //리액트 쿼리
    //장바구니 업데이트 서브밋
    const updateCartItem = useCallback(async (name: string, _id: string) => {
        const calcCartItemPrice = cartItem.totalPrice / cartItem.totalCount;

        //계산 된 값을 미리 받아 놓기 위한 초기값.
        let nextCount = cartCount;
        let nextTotalPrice = cartItemTotalPrice;

        try{
            setIsLoading(true);

            if(name === "decrement") {
                nextCount = Math.max(1, cartCount - 1);
                nextTotalPrice = Math.max(calcCartItemPrice, cartItemTotalPrice - calcCartItemPrice);
            }

            if(name === "increment") {
                nextCount = cartCount + 1;
                nextTotalPrice = cartItemTotalPrice + calcCartItemPrice;
            }

            setCartCount(nextCount);
            setCartItemTotalPrice(nextTotalPrice);

            const data = await updateCartApi(
                _id,
                nextTotalPrice,
                nextCount
            );

            if(!data.success) {
                setModalText(data.message);
                setModalShow(true);
                return;
            };

            queryClient.invalidateQueries({ queryKey: ['carts'] });
            return;
        }catch(err: any) {
            console.error(err.response?.data?.message);
            return;
        } finally {
            setIsLoading(false);
        }
    }, [cartCount, cartItemTotalPrice, cartItem.totalPrice, cartItem.totalCount]);

    //장바구니 단일 삭제 핸들러
    const deleteCartItem = useCallback(async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const data = await deleteCartApi(cartItem._id);
            if(!data.success) {
                setModalShow(true);
                setModalText(data.message);
                return;
            }

            queryClient.invalidateQueries({ queryKey: ['carts'] });
            return;
        } catch(err: any) {
            console.error(err.response?.data?.message);
            setModalShow(true);
            setModalText(err.response?.data?.message);
            return;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <div className='cart-top'>
                <p className='cart-name'>{cartItem.productName}</p>
                <button 
                    className='cart-close'
                    onClick={deleteCartItem}
                >
                    <span></span>
                    <span></span>
                </button>
            </div> {/* cart-top : end */}

            <div className='cart-item'>
                <div className='cart__image'>
                    <CldImage 
                        src={cartItem.img.publicId}
                        width={500}
                        height={500}
                        alt={cartItem.img.imgName}
                    />
                </div>
                <div className='cart__detail'>
                    <ul className='cart__list'>
                        <li className='cart__list--item'>
                            <p className='cart__text'>기본가격</p>
                            <p className='cart__text'>{cartItem.price} 원</p>
                        </li>
                        {
                            cartItem.lightly && 
                            (
                                <li className='cart__list--item'>
                                    <p className='cart__text'>연하게</p>
                                </li>
                            )
                        }
                        {
                            cartItem.addPrice.map((add) => {
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
                                name='decrement'
                                onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    updateCartItem(e.currentTarget.name, cartItem._id);
                                }}
                            >
                                <Image src={minusIco} alt='마이너스' />
                            </button>
                            <input className='cart-option__input' type="number" value={cartCount} readOnly />
                            <button 
                                className='cart-option__button'
                                name='increment'
                                onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    updateCartItem(e.currentTarget.name, cartItem._id);
                                }}
                            >
                                <Image src={plusIco} alt='플러스' />
                            </button>
                        </div>
                        <p className='cart__total-price'>
                            {formatPrice(cartItemTotalPrice)}원
                        </p>
                    </div>
                </div>
            </div>

            {
                modalShow &&
                <Modal 
                    modalText={modalText}
                    modalShow={modalShow}
                    setModalText={setModalText}
                    setModalShow={setModalShow}
                />
            }
        </>
    );
};

export default CartItem;