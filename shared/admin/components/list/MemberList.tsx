import { Members } from '@/app/types/members/member';
import { formatBirth, formatCreatedAt, formatPhoneNumber } from '@/app/util/format';
import React from 'react';

const MemberList = ({members}: Members) => {
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
                    <tr>
                        <th>이름</th>
                        <th>가입일</th>
                        <th>이메일</th>
                        <th>연락처</th>
                        <th>생년월일</th>
                    </tr>
                    {
                        members?.map((member) => (
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