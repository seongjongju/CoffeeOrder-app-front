import { Orders } from "@/app/types/orders/orders";
import { orderGetApi } from "@/features/adminApi/adminOrderApi";
import { useQuery } from "@tanstack/react-query";

const useOrderQuery = () => {
    const orderQuery = useQuery<Orders>({
        queryKey: ['products'],
        queryFn: orderGetApi,
    });

    const allOrders = orderQuery.data;
    const orders = allOrders?.result;

    return {
        orders: orders || [],
    };
};

export default useOrderQuery;