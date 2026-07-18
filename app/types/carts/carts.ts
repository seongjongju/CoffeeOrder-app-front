import { OptionState, ProductImgType } from "../products/product";

export type Cart = {
    userId: string;
    userName: string;
    _id: string;
    productCode: string;
    img: ProductImgType;
    productName: string;
    price: string;
    totalPrice: number;
    totalCount: number;
    lightly: boolean;
    addPrice: OptionState;
    usedInventorys: Array<{
        _id: string;
        category: string;
        inventoryName: string;
        quantity: string;
    }>
};

//카트 조회 타입
export type CartGetType = {
    result: Array<Cart>;
};