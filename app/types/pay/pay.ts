export interface Item {
    _id: string;
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