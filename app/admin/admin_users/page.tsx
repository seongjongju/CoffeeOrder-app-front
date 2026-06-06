import React from 'react';
import MembersInterface from './_components/MembersInterface';

const AdminUsersPage = () => {    
    return (
        <main className='main admin-main'>
            <h2 className='admin-title'>회원목록</h2>
            
            <div 
                className='dashboard'
                style={{
                    minHeight: "80vh"
                }}
            >
                <MembersInterface />
            </div>
        </main>
    );
};

export default AdminUsersPage;