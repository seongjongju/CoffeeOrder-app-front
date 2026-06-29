import React from 'react';

const LatelyOrderList = () => {
    return (
        <div
            style={{
                height: "83%",
                overflow: "auto"
            }}
        >
            <table className='admin-table'>
                <colgroup>
                    <col style={{width: "25%"}} />
                    <col style={{width: "15%"}} />
                    <col style={{width: "25%"}} />
                    <col style={{width: "15%"}} />
                    <col style={{width: "25%"}} />
                </colgroup>
                <tbody>
                    <tr style={{ 
                        position: "sticky",
                        top: "0"
                    }}>
                        <th>주문번호</th>
                        <th>회원명</th>
                        <th>주문제품</th>
                        <th>주문금액</th>
                        <th>주문시간</th>
                    </tr>
                    <tr>
                        <td>ORD-0001248</td>
                        <td>유저명</td>
                        <td>아메리카노 외 2개</td>
                        <td>12,500원</td>
                        <td>
                            2026-06-05  <br />
                            10:30
                        </td>
                    </tr>
                    <tr>
                        <td>ORD-0001248</td>
                        <td>유저명</td>
                        <td>아메리카노 외 2개</td>
                        <td>12,500원</td>
                        <td>
                            2026-06-05  <br />
                            10:30
                        </td>
                    </tr>
                    <tr>
                        <td>ORD-0001248</td>
                        <td>유저명</td>
                        <td>아메리카노 외 2개</td>
                        <td>12,500원</td>
                        <td>
                            2026-06-05  <br />
                            10:30
                        </td>
                    </tr>
                    <tr>
                        <td>ORD-0001248</td>
                        <td>유저명</td>
                        <td>아메리카노 외 2개</td>
                        <td>12,500원</td>
                        <td>
                            2026-06-05  <br />
                            10:30
                        </td>
                    </tr>
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default LatelyOrderList;