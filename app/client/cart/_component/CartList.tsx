'use client';
import useCartQuery from '@/features/hooks/query/useCartQuery';
import React, { useCallback } from 'react';
import CartItem from './CartItem';
import { useQueryClient } from '@tanstack/react-query';
import { allDeleteCartApi } from '@/features/clientApi/cartApi';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import CartItemNone from './CartItemNone';

const CartList = () => {
    const { modalShow, setModalShow, modalText, setModalText } = useModalShow();
    const { carts } = useCartQuery(); //카트 전체 조회

    //장바구니 전체 삭제 핸들러
    const queryClient = useQueryClient();
    const allDeleteCartItem = useCallback(async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await allDeleteCartApi();
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
        <div className={`inner cart-inner ${carts.length === 0 ? "cart-null" : ""}`}>
            {
                carts.length === 0 ?
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
                                carts.map((item) => (
                                    <CartItem 
                                        key={item._id}
                                        cartItem={item}
                                    />
                                ))
                            }
                        </div>
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