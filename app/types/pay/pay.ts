export interface Item {
    _id: string;
    userId: string;
    userName: string;
    productName: string;
    price: string;
    lightly: boolean;
    addPrice: Array<{
        id: string;
        count: number;
        label: string;
    }>;
    totalPrice: number;
    totalCount: number;
    img: {
        format: string;
        imgName: string;
        publicId: string;
    };
};

export type paymentData = {
    userId: string;
    userName: string;
    amount: number;
    productName: string;
    createAt: string;
    items: Item[];
    orderId: string;
    status: string;
    _id: string;
};