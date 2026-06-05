'use client';
import React from 'react';
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const SalesChart = () => {
    const canvasEl = useRef(null);

    useEffect(() => {
        if (canvasEl.current !== null) {
            //인스턴스 요소
            const ctx = canvasEl.current;

            //데이터 라벨
            const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

            //실제 데이터
            const data = {
                labels: labels,
                datasets: [
                    {
                        data: [2, 0, 9, 0, 6, 0, 0, 3, 3, 16],
                        fill: false,
                        borderWidth: 1,
                        tension: 0.1,
                    },
                ],
            };

            //차트 인스턴스
            const salesChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                }
            });

            return function cleanup() {
                salesChart.destroy();
            };
        }
    });

    return (
        <canvas ref={canvasEl} />
    );
};

export default SalesChart;