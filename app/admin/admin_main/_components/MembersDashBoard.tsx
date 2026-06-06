import React from 'react';
import Link from 'next/link';
import MemberList from '@/shared/admin/components/list/MemberList';
import { getMembersApi } from '@/features/adminApi/adminMembersApi';

const MembersDashBoard = async () => {
    const allMembers = await getMembersApi();

    return (
        <div className='dashboard' style={{
            width: "33.3%", 
            height: "300px",
            overflow: "hidden"
        }}>
            <div className='admin-title-ui'>
                <h3 className='admin-title-ui__title'>회원 목록</h3>
                <Link 
                    href={'/admin/admin_users'}
                    className='admin-title-ui__more'
                >
                    전체보기
                </Link>
            </div> {/* .admin-title-ui : end */}

            <MemberList 
                members={allMembers.members}
            />
        </div>
    );
};

export default MembersDashBoard;