//카테고리 타입
export type Category = {
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