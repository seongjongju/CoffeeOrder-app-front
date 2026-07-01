'use client';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko'; 
import { Members } from '@/app/types/members/member';
import { memberCategory } from '@/app/util/admin/category';
import MemberList from '@/shared/admin/components/list/MemberList';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { formatCreatedAt } from "@/app/util/format";

export interface MembersProps {
    members: Members['members'];
    params?: string;
    firstDateParams?: string;
    lastDateParams?:string;
}

const MembersInterface = ({ members, params }: MembersProps) => {
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
                            router.push(`/admin/admin_users`);
                            return;
                        }

                        router.push(`/admin/admin_users?cate=${e.target.value}`);
                    }}
                >
                    <option value="">전체</option>
                    {
                        memberCategory.map((cate) => (
                            <option value={cate.cate} key={cate.id}>{cate.cate}</option>
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
                                router.push(`/admin/admin_users?cate=${params}&q=${search}`);
                                return;
                            }

                            //카테고리가 없다면 전체 기간 검색
                            //카테고리가 있다면 카테고리 별 기간 검색
                            if(params === undefined) {
                                router.push(`
                                    /admin/admin_users?startDate=${formatCreatedAt(firstDateParams)}&endDate=${formatCreatedAt(lastDateParams)}
                                `);
                                return;
                            } else {
                                router.push(`
                                    /admin/admin_users?cate=${params}&startDate=${formatCreatedAt(firstDateParams)}&endDate=${formatCreatedAt(lastDateParams)}&q=${search}
                                `);
                                return; 
                            }
                        }}
                    >
                        검색
                    </button>
                </div>
                <div className='admin-form__write date'>
                    <label>가입일:</label>
                    <ReactDatePicker 
                        showIcon 
                        locale={ko}
                        dateFormat="yyyy-MM-dd"
                        selected={firstDate} 
                        onChange={(date: Date | null) => {
                            setFirstDate(date);
                            setLastDate(new Date());

                            //카테고리가 없다면 전체 기간 필터링
                            if(params === undefined) {
                                router.push(`/admin/admin_users?startDate=${formatCreatedAt(date)}`);
                                return;
                            }

                            router.push(`/admin/admin_users?cate=${params}&startDate=${formatCreatedAt(date)}`);
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
                                router.push(`/admin/admin_users?startDate=${formatCreatedAt(firstDate)}&endDate=${formatCreatedAt(date)}`);
                                return;
                            }

                            router.push(`/admin/admin_users?cate=${params}&startDate=${formatCreatedAt(firstDate)}&endDate=${formatCreatedAt(date)}`);
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
                <MemberList 
                    members={members}   
                    params={params} 
                    firstDateParams={firstDateParams}
                    lastDateParams={lastDateParams}
                />
            </div>
        </div>
    );
};

export default MembersInterface;