import { Item } from "../pay/pay";

export type OrderItem = {
    _id: string;
    orderId: string;
    userId: string;
    userName: string;
    amount: number;
    productName: string;
    productCode: string;
    price: string;
    totalPrice: number;
    totalCount: number;
    items: Item[];
    orderType: string;
    status: string;
    tid: string;
    createdAt: string;
};

export type Orders = {
    result: OrderItem[];
};