'use client';
import useCartQuery from '@/features/hooks/query/useCartQuery';
import React, { useCallback } from 'react';
import CartItem from './CartItem';
import { useQueryClient } from '@tanstack/react-query';
import { allDeleteCartApi } from '@/features/clientApi/cartApi';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import CartItemNone from './CartItemNone';
import { useAppSelector } from '@/store/hook';

const CartList = () => {
    const { modalShow, setModalShow, modalText, setModalText } = useModalShow();
    const { carts } = useCartQuery(); //카트 전체 조회
    const user = useAppSelector(state => state.auth.user); //유저 목록

    const userCarts = carts.filter(cart => cart.userId === user.userId); //로그인 된 유저의 장바구니 목록


    //장바구니 전체 삭제 핸들러
    const queryClient = useQueryClient();
    const allDeleteCartItem = useCallback(async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await allDeleteCartApi(user.userId);
            queryClient.invalidateQueries({ queryKey: ['carts'] });
            return;
        } catch(err: any) {
            console.error(err.response?.data?.message);
            setModalShow(true);
            setModalText(err.response?.data?.message);
            return;
        }
    }, []);
    
    return (
        <div className={`inner cart-inner ${userCarts.length === 0 ? "cart-null" : ""}`}>
            {
                userCarts.length === 0 ?
                (
                    <CartItemNone />
                ) :
                (
                    <>
                        <button 
                            className='cart-reset'
                            onClick={allDeleteCartItem}
                        >
                            장바구니 비우기
                        </button>

                        <div className='cart'>
                            {
                                userCarts.map((item) => (
                                    <CartItem 
                                        key={item._id}
                                        cartItem={item}
                                    />
                                ))
                            }
                        </div>

                        <button 
                            className='common-button' 
                            style={{ marginTop: "10px" }}
                            
                        >
                            주문하기 <span className='totla-length'>총 원</span>
                        </button>
                    </>
                )
            }
            
            {
                modalShow &&
                <Modal 
                    modalText={modalText}
                    modalShow={modalShow}
                    setModalText={setModalText}
                    setModalShow={setModalShow}
                />
            }
        </div>
    );
};

export default CartList;