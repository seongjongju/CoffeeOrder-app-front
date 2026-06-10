import { Inventory } from "@/app/types/inventorys/inventory";

const baseUrl = '/api/admin';
const baseUrl_1 = `${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/admin`;

//재고등록
export const inventoryRegiApi = async (
    inventoryName: string,
    category: string,
    quantity: number
) => {
    const url = `${baseUrl}/admin_inventory_regi`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inventoryName, category, quantity
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//전체 재고 조회
export const inventoryGetApi = async () => {
    const url = `${baseUrl_1}/admin_inventorys`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: "no-store" as const,
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//재고 단일 삭제
export const inventoryDeleteApi = async (_id: string) => {
    const url = `${baseUrl_1}/admin_inventory_delete`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//재고 일괄 삭제
export const inventoryAllDeleteApi = async (inventoryArray: Inventory['inventorys']) => {
    const url = `${baseUrl_1}/admin_inventory_all_delete`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inventoryArray
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

//재고 업데이트
export const inventoryUpdateApi = async (
    _id: string,
    inventoryName: string,
    category: string,
    quantity: number
) => {
    const url = `${baseUrl}/admin_inventory_update`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id, inventoryName, category, quantity
        }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};

