import React from 'react';
import MembersInterface from './_components/MembersInterface';
import { getMembersApi } from '@/features/adminApi/adminMembersApi';
import MemberList from '@/shared/admin/components/list/MemberList';

const AdminUsersPage = async () => {  
    const allMembers = await getMembersApi();
    
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>회원목록</h2>
            
            <div 
                className='dashboard'
                style={{
                    minHeight: "80vh"
                }}
            >
                <MembersInterface>
                    <MemberList 
                        members={allMembers.members}    
                    />
                </MembersInterface>
            </div>
        </main>
    );
};

export default AdminUsersPage;