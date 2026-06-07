//카테고리 타입
export type Category = {
    categorys: Array<{
        id: string;
        cate: string;
    }>;
    inventorys: Array<{
        _id: string;
        inventoryName: string,
        category: string,
        quantity: number
    }>;
};

export type Inventory = {
    inventorys: Array<{
        _id: string;
        inventoryName: string,
        category: string,
        quantity: number
    }>;
};