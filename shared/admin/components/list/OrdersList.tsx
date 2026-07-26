'use client';
import { OrdersProps } from '@/app/admin/admin_orders/_components/OrdersInterface';
import { formatCreatedAt, formatPrice } from '@/app/util/format';
import useOrderQuery from '@/features/hooks/query/useOrderQuery';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

const OrdersList = ({orders, params, firstDateParams, lastDateParams}:OrdersProps) => {
    const pathName = usePathname();
    const searchParams =  useSearchParams().get('q') || ""; //검색어

    //메인 페이지가 아니라면 검색을 적용한다.
    const searchFiltered = useMemo(() => {
        if(params === "이름") {
            const nameList = orders.filter(order => order.userName.includes(searchParams.trim().toUpperCase()));
            return [...nameList];                        
        } else if (params === "아이디") {
            const idList = orders.filter(order => order.userId.includes(searchParams.trim()));
            return [...idList];   
        } else {
            return orders;
        }
    }, [pathName, params, searchParams, orders]);

    //주문일 필터링
    const dateFiltered = useMemo(() => {
        if(!firstDateParams || !lastDateParams) {
            return searchFiltered;
        }

        //전체 기간 필터링
        if(params === firstDateParams) {
            const dateList = searchFiltered.filter(order => formatCreatedAt(order.createdAt));
            return [...dateList];
        }

        const searchDateList  = searchFiltered.filter(order => firstDateParams <= formatCreatedAt(order.createdAt) && lastDateParams >= formatCreatedAt(order.createdAt));
        return [...searchDateList];
    }, [pathName, params, firstDateParams, lastDateParams, orders]);

    return (
        <div
            style={{
                height: "83%",
                overflow: "auto"
            }}
        >
            <table className='admin-table'>
                <tbody>
                    <tr style={{ 
                        position: "sticky",
                        top: "0"
                    }}>
                        <th>주문번호</th>
                        <th>주문일시</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>메뉴</th>
                        <th>총 결제금액</th>
                    </tr>
                    {
                        dateFiltered?.map((order) => {         
                            return (
                                <tr 
                                    style={{cursor: "pointer"}}
                                    key={order._id}
                                    
                                >
                                    <td>{order.orderId}</td>
                                    <td>{formatCreatedAt(order.createdAt)}</td>
                                    <td>{order.userName}</td>
                                    <td>{order.userId}</td>
                                    <td>{order.productName}</td>
                                    <td>{formatPrice(order.amount)}원</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default OrdersList;