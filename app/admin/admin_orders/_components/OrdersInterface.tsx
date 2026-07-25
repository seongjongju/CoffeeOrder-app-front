'use client';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko'; 
import { orderCategory } from '@/app/util/admin/category';
import useOrderQuery from '@/features/hooks/query/useOrderQuery';
import OrdersList from '@/shared/admin/components/list/OrdersList';
import React, { useRef, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { formatCreatedAt } from "@/app/util/format";
import { Orders } from "@/app/types/orders/orders";

export interface OrdersProps {
    orders: Orders['result'];
    params?: string;
    firstDateParams?: string;
    lastDateParams?:string;
}

const OrdersInterface = ({orders, params}: OrdersProps) => {
    const router = useRouter();
    const firstDateParams =  useSearchParams().get('startDate') || ""; //시작날짜
    const lastDateParams =  useSearchParams().get('endDate') || ""; //끝 날짜
    const cateRef = useRef<HTMLSelectElement>(null);
    const [search, setSearch] = useState<string>("") //검색용
    const [firstDate, setFirstDate] = useState<Date | null>(new Date()); //기간설정 달력
    const [lastDate, setLastDate] = useState<Date | null>(new Date()); //기간설정 달력

    return (
        <div>
            <form className='admin-form'>
                <select 
                    className='admin-form__select'
                    ref={cateRef}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                        setSearch("");
                        setFirstDate(new Date());
                        setLastDate(new Date());

                        if(e.target.value === "") {
                            router.push(`/admin/admin_orders`);
                            return;
                        }

                        router.push(`/admin/admin_orders?cate=${e.target.value}`);
                    }}
                >
                    <option value="">전체</option>
                    {
                        orderCategory.map((cate) => (
                            <option key={cate.id}>{cate.cate}</option>
                        ))
                    }
                </select>
                <div className='admin-form__write'>
                    <input 
                        type="text" 
                        className='admin-form__input'
                        placeholder={`${params !== undefined ? params + "을 입력하세요." : "카테고리를 선택하세요."}`} 
                        value={search}    
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            //카테고리를 선택하지 않았다면 카테고리 select로 포커스
                            if(params === undefined) {
                                alert('카테고리를 선택해주세요.');
                                cateRef.current?.focus();
                                return;
                            }

                            setSearch(e.target.value);
                        }}      
                    />
                    <button 
                        className='admin-form__search'
                        onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            if(search.trim() === "") {
                                alert('검색어를 입력하세요.');
                                return;
                            }

                            //첫 번째 기간 쿼리스트링이 없다면
                            if(!firstDateParams) {
                                router.push(`/admin/admin_orders?cate=${params}&q=${search}`);
                                return;
                            }

                            //카테고리가 없다면 전체 기간 검색
                            //카테고리가 있다면 카테고리 별 기간 검색
                            if(params === undefined) {
                                router.push(`
                                    /admin/admin_orders?startDate=${formatCreatedAt(firstDateParams)}&endDate=${formatCreatedAt(lastDateParams)}
                                `);
                                return;
                            } else {
                                router.push(`
                                    /admin/admin_orders?cate=${params}&startDate=${formatCreatedAt(firstDateParams)}&endDate=${formatCreatedAt(lastDateParams)}&q=${search}
                                `);
                                return; 
                            }
                        }}
                    >
                        검색
                    </button>
                </div>
                <div className='admin-form__write date'>
                    <label>주문일시:</label>
                    <ReactDatePicker 
                        showIcon 
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        selected={firstDate} 
                        onChange={(date: Date | null) => {
                            setFirstDate(date);
                            setLastDate(new Date());
                            setSearch("");

                            //카테고리가 없다면 전체 기간 필터링
                            if(params === undefined) {
                                router.push(`/admin/admin_orders?startDate=${formatCreatedAt(date)}`);
                                return;
                            }

                            router.push(`/admin/admin_orders?cate=${params}&startDate=${formatCreatedAt(date)}`);
                        }}
                        selectsStart
                        startDate={firstDate}
                        endDate={lastDate}
                    />
                    <span>~</span>
                    <ReactDatePicker 
                        showIcon 
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        selected={lastDate} 
                        onChange={(date: Date | null) => {
                            setLastDate(date);
                            //카테고리가 없다면 전체 기간 필터링
                            if(params === undefined) {
                                router.push(`/admin/admin_orders?startDate=${formatCreatedAt(firstDate)}&endDate=${formatCreatedAt(date)}`);
                                return;
                            }

                            router.push(`/admin/admin_orders?cate=${params}&startDate=${formatCreatedAt(firstDate)}&endDate=${formatCreatedAt(date)}`);
                        }}
                        selectsEnd
                        startDate={firstDate}
                        endDate={lastDate}
                        minDate={firstDate || undefined}
                    />
                </div>
            </form> {/* .admin-form : end */}

            <div 
                className='dashboard'
                style={{
                    minHeight: "80vh"
                }}
            >
                <OrdersList   
                    orders={orders}
                    params={params} 
                    firstDateParams={firstDateParams}
                    lastDateParams={lastDateParams}
                />
            </div>
        </div>
    );
};

export default OrdersInterface;