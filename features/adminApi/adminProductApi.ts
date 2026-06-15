import { Inventory } from "@/app/types/inventorys/inventory";
import { ProductType } from "@/app/types/products/product";

const baseUrl = '/api/admin';
const baseUrl_1 = `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/admin`;

//제품 등록
export const productRegiApi = async (
    img: { imgName: string; format: string; publicId: string },
    productName: string,
    category: string,
    usedInventorys: Inventory['inventorys'],
    price: number,
    recommend: boolean,
    productInfos: Array<ProductType>
) => {
    const url = `${baseUrl}/admin_product_regi`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            img, productName, category, usedInventorys, price, recommend, productInfos
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//전체 제품 조회
export const productGetApi = async () => {
    const url = `${baseUrl_1}/admin_products`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-store" as const,
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//제품 수정
export const productUpdateApi = async (
    productCode: string,
    img: { imgName: string; format: string; publicId: string },
    productName: string,
    category: string,
    usedInventorys: Inventory['inventorys'],
    price: number,
    recommend: boolean,
    productInfos: Array<ProductType>
) => {
    const url = `${baseUrl}/admin_product_update`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productCode, img, productName, category, usedInventorys, price, recommend, productInfos
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};