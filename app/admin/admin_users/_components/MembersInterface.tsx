import { getMembersApi } from '@/features/adminApi/adminMembersApi';
import MemberList from '@/shared/admin/components/list/MemberList';
import React from 'react';

const MembersInterface = async () => {
    const allMembers = await getMembersApi();

    return (
        <MemberList 
            members={allMembers.members}    
        />
    );
};

export default MembersInterface;