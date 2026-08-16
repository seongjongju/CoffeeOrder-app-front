import { Orders } from "@/app/types/orders/orders";
import { orderGetApi } from "@/features/adminApi/adminOrderApi";
import { useSuspenseQuery } from "@tanstack/react-query";

const useOrderQuery = () => {
    const orderQuery = useSuspenseQuery<Orders>({
        queryKey: ['orders'],
        queryFn: orderGetApi,
    });

    const allOrders = orderQuery.data;
    const orders = allOrders?.result;

    return {
        orders: orders || [],
    };
};

export default useOrderQuery;