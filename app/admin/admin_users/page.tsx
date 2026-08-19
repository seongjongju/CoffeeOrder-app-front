import React from 'react';
import MembersInterface from './_components/MembersInterface';
import { getMembersApi } from '@/features/adminApi/adminMembersApi';

const AdminUsersPage = async ({searchParams}: {searchParams: Promise<{cate: string}>}) => {  
    const cateSearchParams = await searchParams;
    const {cate} = cateSearchParams;
    const allMembers = await getMembersApi(); //회원 목록
    
    return (
        <main className='admin-main'>
            <h2 className='admin-title'>회원목록</h2>
            
            <MembersInterface
                members={allMembers.members}
                params={cate}
            />
        </main>
    );
};

export default AdminUsersPage;