import { OptionState, ProductImgType } from "../products/product";

export type Cart = {
    _id: string;
    img: ProductImgType;
    productName: string;
    price: string;
    totalPrice: number;
    totalCount: number;
    lightly: boolean;
    addPrice: OptionState;
};

//카트 조회 타입
export type CartGetType = {
    result: Array<Cart>;
};