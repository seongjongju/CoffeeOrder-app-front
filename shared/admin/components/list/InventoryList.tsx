import React from 'react';

const InventoryList = () => {
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
                    <col style={{width: "25%"}} />
                    <col style={{width: "25%"}} />
                    <col style={{width: "25%"}} />
                </colgroup>
                <tbody>
                    <tr>
                        <th>제품명</th>
                        <th>재고 수량</th>
                        <th>분류</th>
                        <th>상태</th>
                    </tr>
                    <tr>
                        <td>ooo원두</td>
                        <td>10</td>
                        <td>원두</td>
                        <td className='normal'>정상</td>
                    </tr>
                    <tr>
                        <td>저지방 우유</td>
                        <td>2</td>
                        <td>유제품</td>
                        <td className='lack'>부족</td>
                    </tr>
                    <tr>
                        <td>ooo원두</td>
                        <td>10</td>
                        <td>원두</td>
                        <td className='normal'>정상</td>
                    </tr>
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default InventoryList;