'use client';
import Image from 'next/image';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import React, { memo, useCallback, useMemo, useState } from 'react';
import useModalShow from '@/features/hooks/modal/useModalShow';
import Modal from '@/shared/client/components/modal/Modal';
import { OptionState, ProductImgType } from '@/app/types/products/product';
import { formatPrice } from '@/app/util/format';
import { addCartApi } from '@/features/clientApi/cartApi';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hook';
import { useRouter } from 'next/navigation';
interface OptionProps {
    viewProduct: {
        img: ProductImgType
        productName: string;
        price: string;
    };
    lightly: boolean;
    addState: OptionState;
}

const OrderBar = memo(({
    viewProduct, 
    lightly, 
    addState 
}: OptionProps) => {
    const router = useRouter();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow(); //모달창
    const user = useAppSelector(state => state.auth.user); //유저 정보
    const [totalCount, setTotalCount] = useState<number>(1);

    //옵션 합산금액
    const addPriceSum = useMemo(() => {
        return addState.map(add => add.addPrice).reduce((acc, current) => acc + current, 0);
    }, [addState]);

    //최종 금액
    const calcPrice = useMemo(() => {
        const basePrice = Number(viewProduct.price.replaceAll(',', ''));
        return (basePrice + addPriceSum) * totalCount;
    }, [viewProduct.price, addPriceSum, totalCount]);

    const totalIncrement = useCallback(() => {
        setTotalCount(prev => prev + 1);
    }, []);

    const totalDecrement = useCallback(() => {
        setTotalCount(prev => Math.max(1, prev - 1));
    }, []);

    //장바구니 추가 핸들러
    const queryClient = useQueryClient(); //헤더에 실시간 갯수 반영을 위해
    const handleClickAddToCart = useCallback(async () => {
        try {
            const data = await addCartApi(
                user.userId,
                user.userName,
                viewProduct.img,
                viewProduct.productName,
                viewProduct.price,
                calcPrice, 
                totalCount,
                lightly, 
                addState
            );

            setModalShow(true);
            
            if(!data.success) {
                setModalText(data.message);
                return;
            }

            setModalText(data.message);
            queryClient.invalidateQueries({ queryKey: ['carts'] });
            return;
        } catch(err: any) {
            console.error(err.response?.data?.message);
            setModalShow(true);
            setModalText(err.response?.data?.message);
            return;
        }
    }, [calcPrice, lightly, addState, setModalShow, setModalText]);

    return (
        <div className='order-bar'>
            <div className='order-bar__options'>
                {
                    lightly &&
                    (
                        <p className='order-bar__option'>연하게</p>
                    )
                }
                {
                    addState !== undefined &&
                    addState.map((add) => {
                        if(add.count === 0) return;
                        return (
                            <p 
                                key={add.id}
                                className='order-bar__option'
                            >
                                {add.label} x {add.count}
                            </p>
                        )
                    })
                }
            </div>
            
            <form className='order-bar__form'>
                <div className='view-option'>
                    <p className='order-bar__price'>
                        Total : {formatPrice(calcPrice)}원
                    </p>
                    <div className='view-option__quantity-wrap'>
                        <button 
                            className='view-option__button'
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                totalDecrement();
                            }}
                        >
                            <Image src={minusIco} alt='마이너스버튼' />
                        </button>
                        <input 
                            className='view-option__input'
                            type="number" 
                            value={totalCount}
                            readOnly
                        />
                        <button 
                            className='view-option__button'
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                totalIncrement();
                            }}
                        >
                            <Image src={plusIco} alt='플러스버튼' />
                        </button>
                    </div> {/* view-option__quantity-wrap */}
                </div> {/* view-option */}
                <div className='order-bar__btns'>
                    <button 
                        className='order-bar__button--cart'
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            handleClickAddToCart();
                        }}
                    >
                        장바구니
                    </button>
                    <button 
                        className='order-bar__button--order'
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            const querys = [
                                {
                                    _id: `${user.userId}-${user.userName}` ,
                                    userId: user.userId,
                                    userName: user.userName,
                                    img: viewProduct.img,
                                    productName: viewProduct.productName,
                                    price: viewProduct.price,
                                    totalPrice: calcPrice,
                                    totalCount: totalCount,
                                    lightly: lightly,
                                    addPrice: addState,
                                }
                            ];

                            router.push(`/client/pay/payment?order=single&items=${JSON.stringify(querys)}`);
                        }}
                    >
                        주문하기
                    </button>
                </div> {/* order-bar__btns */}
            </form> {/* order-bar__form */}

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
});

export default OrderBar;