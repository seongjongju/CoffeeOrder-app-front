import { Inventory } from "../inventorys/inventory";

//제품 타입
export type ProductType = {
    id: string;
    name?: string;
    label?: string;
    value?: string;
};

//제품 조회 타입
export type ProductGetType = {
    products: Array<{
        _id: string;
        category: string,
        img: {
            format: string,
            imgName: string,
            publicId: string,
        };
        productCode: string,
        productInfos:ProductType[];
        productName: string,
        price: string;
        recommend: boolean;
        usedInventorys: Inventory['inventorys'];
    }>
};

//제품 업데이트 타입
export type ProductUpdateType = {
    id: string;
    value?: string
    name?: string;
    label?: string;
};

//제품 등로 리듀서 타입
export type ProductState = Array<ProductType>;

//제품 업데이트 리듀서 타입
export type ProductUpdateState = Array<ProductUpdateType>;

//제품 추가 옵션 타입
export type OptionItem = {
    id: string;
    label: string;
    count: number;
    addPrice: number;
};

export type OptionState = Array<OptionItem>;