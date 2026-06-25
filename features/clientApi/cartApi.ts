import { OptionState, ProductImgType } from "@/app/types/products/product";
import { api, api_1 } from "./base";

//장바구니 추가
export const addCartApi = async (
    userId: string,
    userName: string,
    img: ProductImgType,
    productName: string,
    price: string,
    totalPrice:number,
    totalCount: number,
    lightly: boolean,
    addPrice: OptionState
) => {
    const res = await api.post('/cart/add_cart',
        {
            userId, 
            userName, 
            img, 
            productName, 
            price, 
            totalPrice, 
            totalCount, 
            lightly, 
            addPrice 
        }
    );

    const data = await res.data;
    return data;
};

//장바구니 조회
export const getCartApi = async () => {
    const res = await api_1.get('/cart/get_cart');

    const data = await res.data;
    return data;
};

//장바구니 단일 삭제
export const deleteCartApi = async (_id: string) => {
    const res = await api.delete('/cart/delete_cart', {
        params: { _id }
    });

    const data = await res.data;
    return data;
};

//장바구니 전체 삭제
export const allDeleteCartApi = async (userId: string) => {
    const res = await api.delete('/cart/all_delete_cart', {
        params: {
            userId
        }
    });

    const data = await res.data;
    return data;
};