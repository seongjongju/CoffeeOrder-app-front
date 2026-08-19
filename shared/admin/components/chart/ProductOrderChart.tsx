'use client';

import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { OrdersProps } from '@/app/types/orders/orders';
import { ProductGetType } from '@/app/types/products/product';

interface ProductOrderChartProps {
    orders: OrdersProps['orders'];
    products: ProductGetType['products'];
}

const ProductOrderChart = memo(({ orders, products }: ProductOrderChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const { labels, quantities } = useMemo(() => {
        const labels = products.map(product => product.productName);

        const totalQuantityMap = new Map<string, number>();

        orders.forEach(order => {
            order.items.forEach(item => {
                const currentQty = totalQuantityMap.get(item.productName) || 0;

                const itemQuantity = item.totalCount ?? 1; 

                totalQuantityMap.set(item.productName, currentQty + itemQuantity);
            });
        });

        const quantities = labels.map(name => totalQuantityMap.get(name) || 0);

        return { labels, quantities };
    }, [products, orders]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current;

        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '주문 수량',
                        data: quantities, 
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        suggestedMax: 5,
                        ticks: {
                            stepSize: 1,
                        },
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };
    }, [labels, quantities]);

    return <canvas ref={canvasRef} />;
});

ProductOrderChart.displayName = 'ProductOrderChart';

export default ProductOrderChart;