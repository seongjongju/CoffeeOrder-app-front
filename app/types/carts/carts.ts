import { OptionState, ProductImgType } from "../products/product";

//카트 조회 타입
export type CartGetType = {
    result: Array<{
        _id: string;
        img: ProductImgType;
        productName: string;
        price: string;
        totalPrice: number;
        totalCount: number;
        lightly: boolean;
        addPrice: OptionState;
    }>;
};