import React, { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    setProductModalShow: Dispatch<SetStateAction<boolean>>;
    productModalShow: boolean;
};

const ProductRegiModal = ({ setProductModalShow, productModalShow }: ModalProps) => {
    return (
        <>
            <div 
                className='dim'
                onClick={() => setProductModalShow(false)}
            ></div>
            <div 
                className='product-regi-modal'
                style={{
                    display: `${productModalShow ? "block" : "none"}`
                }}
            >
                <div className='product-regi-modal__write'> 
                    <label htmlFor="" className='product-regi-modal__label'>제품 이미지</label>
                    <input type="file" className='product-regi-modal__file' />
                </div> {/* .product-regi-modal__write : end */}
                
                <div className='product-regi-modal__write'> 
                    <label htmlFor="" className='product-regi-modal__label'>제품명</label>
                    <input 
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='제품명을 입력하세요.'
                    />
                </div> {/* .product-regi-modal__write : end */}

                <div className='product-regi-modal__write'> 
                    <label htmlFor="" className='product-regi-modal__label'>카테고리</label>
                    <select className='product-regi-modal__select'>
                        <option value="">카테고리</option>
                        <option value="">커피</option>
                        <option value="">에이드</option>
                        <option value="">디저트</option>
                    </select> {/* .product-regi-modal__select : end */}
                </div> {/* .product-regi-modal__write : end */}

                <div className='product-regi-modal__write check'> 
                    <label htmlFor="" className='product-regi-modal__label'>사용 재고 선택</label>
                    <div className='product-regi-modal__check-wrap'>
                        <div className='product-regi-modal__check'>
                            <input type="checkbox" className='product-regi-modal__checkbox' />
                            <label htmlFor="" className='product-regi-modal__label'>OOO원두</label>
                        </div> {/* .product-regi-modal__check : end */}
                        <div className='product-regi-modal__check'>
                            <input type="checkbox" className='product-regi-modal__checkbox' />
                            <label htmlFor="" className='product-regi-modal__label'>OOO원두</label>
                        </div> {/* .product-regi-modal__check : end */}
                    </div> {/* .product-regi-modal__check-wrap : end */}
                </div> {/* .product-regi-modal__write : end */}

                {/* 용량 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="" className='product-regi-modal__label'>용량</label>
                    <input 
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='용량을 입력하세요.'
                    />
                </div> 

                {/* 칼로리 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-calories" className='product-regi-modal__label'>칼로리</label>
                    <input 
                        id="product-calories"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='칼로리를 입력하세요.'
                    />
                </div>

                {/* 탄수화물 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-carbs" className='product-regi-modal__label'>탄수화물</label>
                    <input 
                        id="product-carbs"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='탄수화물 함량을 입력하세요.'
                    />
                </div>

                {/* 단백질 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-protein" className='product-regi-modal__label'>단백질</label>
                    <input 
                        id="product-protein"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='단백질 함량을 입력하세요.'
                    />
                </div>

                {/* 카페인 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-caffeine" className='product-regi-modal__label'>카페인</label>
                    <input 
                        id="product-caffeine"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='카페인 함량을 입력하세요.'
                    />
                </div>

                {/* 나트륨 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-sodium" className='product-regi-modal__label'>나트륨</label>
                    <input 
                        id="product-sodium"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='나트륨 함량을 입력하세요.'
                    />
                </div>

                {/* 당류 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-sugar" className='product-regi-modal__label'>당류</label>
                    <input 
                        id="product-sugar"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='당류 함량을 입력하세요.'
                    />
                </div>

                {/* 포화지방 입력란 */}
                <div className='product-regi-modal__write'> 
                    <label htmlFor="product-fat" className='product-regi-modal__label'>포화지방</label>
                    <input 
                        id="product-fat"
                        type="text" 
                        className='product-regi-modal__input'
                        placeholder='포화지방 함량을 입력하세요.'
                    />
                </div>

                <button className='product-regi-modal__button'>등록하기</button>
            </div> {/* .product-regi-modal : end */}
        </>
    );
};

export default ProductRegiModal;