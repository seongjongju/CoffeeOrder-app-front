'use client';
import { MembersProps } from '@/app/admin/admin_users/_components/MembersInterface';
import { formatBirth, formatCreatedAt, formatPhoneNumber } from '@/app/util/format';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

const MemberList = ({members, params, firstDateParams, lastDateParams}: MembersProps) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams =  useSearchParams().get('q') || ""; //검색어
    
    //메인 페이지가 아니라면 검색을 적용한다.
    const searchFiltered = useMemo(() => {
        if(params === "이름") {
            const nameList = members.filter(mem => mem.name.includes(searchParams.trim().toUpperCase()));
            return [...nameList];                        
        } else if (params === "이메일") {
            const emailList = members.filter(mem => mem.email.includes(searchParams.trim()));
            return [...emailList];   
        } else {
            return members;
        }
    }, [pathName, params, searchParams, members]);

    //가입일 필터링
    const dateFiltered = useMemo(() => {
        if(!firstDateParams || !lastDateParams) {
            return searchFiltered;
        }

        //전체 기간 필터링
        if(params === firstDateParams) {
            const dateList = members.filter(mem => formatCreatedAt(mem.createdAt));
            return [...dateList];
        }

        const searchDateList  = searchFiltered.filter(mem => firstDateParams < formatCreatedAt(mem.createdAt) && lastDateParams > formatCreatedAt(mem.createdAt));
        return [...searchDateList];
    }, [pathName, params, firstDateParams, lastDateParams, members]);

    return (
        <div
            style={{
                height: "83%",
                overflow: "auto"
            }}
        >
            <table className='admin-table'>
                <colgroup>
                    <col style={{width: "15%"}} />
                    <col style={{width: "20%"}} />
                    <col style={{width: "25%"}} />
                    <col style={{width: "25%"}} />
                    <col style={{width: "15%"}} />
                </colgroup>
                <tbody>
                    <tr style={{ 
                        position: "sticky",
                        top: "0"
                    }}>
                        <th>이름</th>
                        <th>가입일</th>
                        <th>이메일</th>
                        <th>연락처</th>
                        <th>생년월일</th>
                    </tr>
                    {
                        dateFiltered?.map((member) => (
                            <tr key={member._id}>
                                <td>{member?.name}</td>
                                <td>
                                    {
                                        formatCreatedAt(member?.createdAt)
                                    }
                                </td>
                                <td>{member?.email}</td>
                                <td>
                                    {
                                        formatPhoneNumber(member?.phoneNumber)
                                    }
                                </td>
                                <td>
                                    {
                                        formatBirth(member?.birth)
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default MemberList;