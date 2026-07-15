export interface Item {
    _id: string;
    userId: string;
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
    amount: number;
    createAt: string;
    items: Item[];
    orderId: string;
    status: string;
    _id: string;
};