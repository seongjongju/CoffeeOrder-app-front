import { Inventory } from "../inventorys/inventory";

//제품 타입
export type ProductType = {
    id?: string;
    name?: string;
    value?: number;
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
        productInfos?:ProductType[];
        productName: string,
        price: number;
        recommend: boolean;
        usedInventorys: Inventory['inventorys'];
    }>
};

//제품 업데이트 타입
export type ProductUpdateType = {
    id: string;
    value?: number
    name?: string;
    label?: string;
};

//제품 등로 리듀서 타입
export type ProductState = Array<ProductType>;

//제품 업데이트 리듀서 타입
export type ProductUpdateState = Array<ProductUpdateType>;