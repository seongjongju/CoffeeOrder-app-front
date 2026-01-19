'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderHistoryPage = () => {
    const [historys, setHistorys] = useState([]);

    useEffect(() => {
        const getOrderHistory = async () => {
            try{
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/myOrder/myOrder`, 
                    {withCredentials: true}
                );

                setHistorys(response.data);
            } catch(error) {
                console.error("주문 내역 로드 실패:", error);
            }
        };

        getOrderHistory();
    }, []);

    return (
        <main className='main'>
            {
                historys.map((his) => (
                    <div key={his}></div>
                ))
            }
        </main>
    );
};

export default OrderHistoryPage