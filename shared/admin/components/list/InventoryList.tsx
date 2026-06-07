import InventoryUpdateBtn from '@/app/admin/admin_inventory/_components/InventoryUpdateBtn';
import { Inventory } from '@/app/types/inventorys/inventory';
import React from 'react';

const InventoryList = ({ inventorys }: Inventory) => {    
    return (
        <div
            style={{
                height: "83%",
                overflow: "auto"
            }}
        >
            <table className='admin-table'>
                <tbody>
                    <tr>
                        <th>분류</th>
                        <th>제품명</th>
                        <th>재고 수량</th>
                        <th>상태</th>
                        <th></th>
                    </tr>
                    {
                        inventorys?.map((inven) => (
                            <tr key={inven._id}>
                                <td>{inven?.category}</td>
                                <td>{inven?.inventoryName}</td>
                                <td>{inven?.quantity}</td>
                                <td
                                    className={`${inven?.quantity <= 2 ? "lack" : "normal"}`}
                                >
                                    {
                                        inven?.quantity <= 2 ? "부족" : "정상"
                                    }
                                </td>
                                <td>
                                    <InventoryUpdateBtn />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> {/* .admin-table : end */}
        </div>
    );
};

export default InventoryList;