import { OptionState, ProductImgType } from "../products/product";

export type Cart = {
    _id: string;
    userId: string;
    userName: string;
    productName: string;
    productCode: string;
    price: string;
    lightly: boolean;
    addPrice: Array<{
        id: string;
        count: number;
        label: string;
    }>;
    totalPrice: number;
    totalCount: number;
    usedInventorys: Array<{
        _id: string;
        inventoryName: string;
        category: string;
        quantity: number;
    }>;
    img: {
        format: string;
        imgName: string;
        publicId: string;
    };
};

//카트 조회 타입
export type CartGetType = {
    result: Array<Cart>;
};