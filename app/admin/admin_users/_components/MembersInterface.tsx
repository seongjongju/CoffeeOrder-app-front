'use client';
import { Members } from '@/app/types/members/member';
import { memberCategory } from '@/app/util/admin/category';
import MemberList from '@/shared/admin/components/list/MemberList';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

export interface MembersProps {
    members: Members['members'];
    params?: string;
}

const MembersInterface = ({ members, params }: MembersProps) => {
    const router = useRouter();
    const cateRef = useRef<HTMLSelectElement>(null);
    const [search, setSearch] = useState<string>("") //검색용

    return (
        <div>
            <form className='admin-form'>
                <select 
                    className='admin-form__select'
                    ref={cateRef}
                    onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                        setSearch("");

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

                            router.push(`/admin/admin_users?cate=${params}&q=${search}`);
                        }}
                    >
                        검색
                    </button>
                </div>
                <div className='admin-form__write date'>
                    <label>가입일:</label>
                    <input 
                        type="date" 
                    />
                    <span>~</span>
                    <input type="date" />
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
                />
            </div>
        </div>
    );
};

export default MembersInterface;