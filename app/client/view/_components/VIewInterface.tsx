'use client';
import useProductQuery from '@/features/hooks/query/useProductQuery';
import { CldImage } from 'next-cloudinary';
import React, { useState } from 'react';
import ViewDetail from './ViewDetail';
import plusIco from '@/public/icons/view_plus.svg';
import minusIco from '@/public/icons/view_minus.svg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import OrderBar from './OrderBar';

interface ViewProps {
    prdParams: string;
};

//수량 옵션 인풋 타입
type OptionItem = {
    id: string;
    label: string;
};

type OptionState = Array<OptionItem>;

export type QuantityOption = {
    id: string;
    lightly: boolean;
    count: number;
    addPrice: number;
};

//수량을 받는 인풋 값
const options: OptionState = [
    {id: "shot", label: "샷 추가" },
    {id: "syrup", label: "시럽 추가" },
    {id: "whipping", label: "휘핑크림 추가" },
];

const VIewInterface = ({prdParams}: ViewProps) => {
    const {products} = useProductQuery();
    const searchParams = useSearchParams();

    const [lightly, setLightly] = useState<boolean>(false); //연하기
    //타입 정의를 위해 연하기와 동일한 옵션 넣어줌
    const [shot, setShot] = useState<QuantityOption>({id: "shot", lightly: false, count: 0, addPrice: 0}); //샷 
    const [syrup, setSyrup] = useState<QuantityOption>({id: "syrup", lightly: false, count: 0, addPrice: 0}); //시럽 
    const [whipping, setWhipping] = useState<QuantityOption>({id: "whipping", lightly: false, count: 0, addPrice: 0}); //휘핑크림

    //해당 상세내용만 불러오기 위한 필터링
    const viewProduct = products?.find(prd => prd.productCode === prdParams);
    if(!viewProduct) return;

    //인풋에 보여지는 값
    const optionInputValue = (id: string) => {
        if(id === "shot") return shot.count;
        if(id === "syrup") return syrup.count;
        if(id === "whipping") return whipping.count;

        return 0;
    };

    //옵션별 카운팅
    const optionCounted = (id: string) => {
        switch(id) {
            case "shot":
                return shot.count;
            case "syrup":
                return syrup.count;
            case "whipping":
                return whipping.count;
            default: 
                return;
        }
    };

    //서버로 넘길 카운팅 배열
    const optionArray = [
        {id: "lightly", lightly: lightly, count: 0, addPrice: 0},
        shot,
        syrup,
        whipping
    ];

    return (
        <>
            <nav className='inner'>
                <figure className='view-thum'>
                    <CldImage
                        className='view-thum__image'
                        src={viewProduct.img.publicId}
                        width={500}
                        height={500}
                        alt={viewProduct.img.imgName}
                    />
                </figure>
                <p className='view-thum__title'>{viewProduct.productName}</p> 

                <p className='view-title'>옵션</p>
                <form className='view-form'>
                    {
                        searchParams.get("category") === "커피" &&
                        (
                            <div className='view-option__density'>
                                <p className='text-body'>
                                    연하게
                                </p>   
                                <label className='label'>
                                    <div className='all-checked-custom'>
                                        <input 
                                            className='checked-input' 
                                            type="checkbox"
                                            checked={lightly}
                                            onChange={() => {
                                                setLightly(prev => !prev);
                                            }}
                                        />
                                        <span className='checked-show-hide'></span>
                                    </div>
                                </label>
                            </div>
                        )
                    }
                    {
                        options.map((op) => (
                            <div
                                key={op.id}
                                className='view-option'
                            >
                                <label className='text-body'>
                                    {op.label} <span>+500</span> 
                                </label>
                                <div className='view-option__quantity-wrap'>
                                    <button 
                                        className='view-option__button'
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.preventDefault();

                                            if(op.id === "shot") {
                                                shot.count > 0 ?
                                                setShot((prev) => ({...prev, count: shot.count - 1, addPrice: shot.addPrice - 500})) :
                                                0;
                                            } else if (op.id === "syrup") {
                                                syrup.count > 0 ?
                                                setSyrup((prev) => ({...prev, count: syrup.count - 1, addPrice: syrup.addPrice - 500})) :
                                                0;
                                            } else if (op.id === "whipping") {
                                                whipping.count > 0 ?
                                                setWhipping((prev) => ({...prev, count: whipping.count - 1, addPrice: whipping.addPrice - 500})) :
                                                0;
                                            }

                                            optionCounted(op.id);
                                        }}
                                    >
                                        <Image src={minusIco} alt='마이너스버튼' />
                                    </button>
                                    <input 
                                        className='view-option__input'
                                        type="number" 
                                        readOnly
                                        min={0}
                                        value={optionInputValue(op.id)}
                                    />
                                    <button 
                                        className='view-option__button'
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.preventDefault();
                                            if(op.id === "shot") {
                                                setShot((prev) => ({...prev, count: shot.count + 1, addPrice: shot.addPrice + 500})); 
                                            } else if (op.id === "syrup") {
                                                setSyrup((prev) => ({...prev, count: syrup.count + 1, addPrice: syrup.addPrice + 500})); 
                                            } else if (op.id === "whipping") {
                                                setWhipping((prev) => ({...prev, count: whipping.count + 1, addPrice: whipping.addPrice + 500}));
                                            }

                                            optionCounted(op.id);
                                        }}
                                    >
                                        <Image src={plusIco} alt='플러스버튼' />
                                    </button>
                                </div> {/* view-option__quantity-wrap */}
                            </div>
                        ))
                    }
                </form>

                <ViewDetail 
                    productInfos={viewProduct.productInfos}
                />
            </nav>

            <OrderBar
                viewProduct={viewProduct}
                optionArray={optionArray}
            />
        </>
    );
};

export default VIewInterface;