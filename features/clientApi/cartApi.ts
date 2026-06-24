import { OptionState, ProductImgType } from "@/app/types/products/product";
import axios from "axios";

export const api = axios.create({
    baseURL: '/api/cart',
    withCredentials: true
});

export const api_1 = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/cart`,
    withCredentials: true
});

//장바구니 추가
export const addCartApi = async (
    img: ProductImgType,
    productName: string,
    price: string,
    totalPrice:number,
    totalCount: number,
    lightly: boolean,
    addPrice: OptionState
) => {
    const res = await api.post('/add_cart',
        {img, productName, price, totalPrice, totalCount, lightly, addPrice }
    );

    const data = await res.data;
    return data;
};

//장바구니 조회
export const getCartApi = async () => {
    const res = await api_1.get('/get_cart');

    const data = await res.data;
    return data;
};

//장바구니 단일 삭제
export const deleteCartApi = async (_id: string) => {
    const res = await api.delete('/delete_cart', {
        params: { _id }
    });

    const data = await res.data;
    return data;
};

//장바구니 전체 삭제
export const allDeleteCartApi = async () => {
    const res = await api.delete('/all_delete_cart', {});

    const data = await res.data;
    return data;
};