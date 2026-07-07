import { Item } from "@/app/types/pay/pay";
import { api, api_1 } from "./base";

export const payCreateApi = async (orderItems: Item[]) => {
    const res = await api.post('/pay/pay_create',
        {
            orderItems
        }
    );

    const data = await res.data;
    return data;
};