import React from 'react';

const MemberList = () => {
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
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                    <tr>
                        <td>유저명</td>
                        <td>2026-06-05</td>
                        <td>abc@gmail.com</td>
                        <td>010-0000-0000</td>
                        <td>19990101</td>
                    </tr>
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default MemberList;