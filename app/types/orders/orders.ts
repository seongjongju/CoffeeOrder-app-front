import { Item } from "../pay/pay";

export type OrderItem = {
    _id: string;
    orderId: string;
    userId: string;
    userName: string;
    amount: number;
    productName: string;
    items: Item[];
    orderType: string;
    status: string;
    tid: string;
    createdAt: string;
};

export type Orders = {
    result: OrderItem[];
};