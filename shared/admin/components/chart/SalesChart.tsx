'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { OrdersProps } from '@/app/types/orders/orders';

interface SalesChartProps {
    orders: OrdersProps['orders'];
}

const currentYear = new Date().getFullYear();
const startYear = 2025;

// 연도 배열 동적 생성
const years = Array.from(
    { length: currentYear - startYear + 1 }, 
    (_, i) => currentYear - i
);

const SalesChart = ({ orders }: SalesChartProps) => {
    const [isYear, setIsYear] = useState<number | string>(years[0]);
    const canvasEl = useRef<HTMLCanvasElement | null>(null);

    const monthData = useMemo(() => {
        const yearData = orders.filter(
            ord => ord.createdAt && String(ord.createdAt).slice(0, 4) === String(isYear)
        );

        const monthArray = Array(12).fill(0);

        yearData.forEach(ord => {
            if (!ord.createdAt) return;

            const monthIndex = parseInt(String(ord.createdAt).slice(5, 7), 10) - 1;

            if (monthIndex >= 0 && monthIndex < 12) {
                monthArray[monthIndex] += Number(ord.amount ?? 0);
            }
        });

        return monthArray;
    }, [isYear, orders]);

    const handlechangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsYear(e.target.value);
    };

    useEffect(() => {
        if (!canvasEl.current) return;

        const ctx = canvasEl.current;
        const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: monthData,
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        return () => {
            salesChart.destroy();
        };
    }, [monthData]); 

    return (
        <>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>달별 매출</h3>
                <select 
                    className='admin-title-ui__select'
                    value={isYear}
                    onChange={handlechangeYear}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div> {/* .admin-title-ui : end */}
            <canvas ref={canvasEl} />
        </>
    );
};

export default SalesChart;