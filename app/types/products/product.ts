import { Inventory } from "../inventorys/inventory";

//제품 타입
export type ProductType = {
    id?: string;
    productName?: string;
    volume?: number;
    calory?: number;
    carbohydrate?: number;
    protein?: number;
    caffeine?: number;
    sodium?: number;
    sugars?: number;
    saturatedFat?: number;
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
        productInfos?:ProductType;
        productName: string,
        price: number;
        recommend: boolean;
        usedInventorys: Inventory['inventorys'];
    }>
};