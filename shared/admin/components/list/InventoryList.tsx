'use client';
import { Inventory } from '@/app/types/inventorys/inventory';
import { inventoryAllDeleteApi, inventoryDeleteApi } from '@/features/adminApi/adminInventoryApi';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const InventoryList = ({ inventorys }: Inventory) => {   
    const [inventoryArray, setInventoryArray] = useState<Inventory['inventorys']>([]);
    const [allChecked, setAllChecked] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    
    //전체선택
    const handleAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inventorys === undefined) {
            alert('선택 가능한 재고가 없습니다.');
            return;
        }

        if (e.target.checked) {
            setInventoryArray([...inventorys] as Inventory['inventorys']);
            setAllChecked(true);
        } else {
            setInventoryArray([] as Inventory['inventorys']);
            setAllChecked(false);
        }
    };
    
    //일괄 삭제용 체크
    const handleInvenChecked = (_id: string) => {        
        const currentInven = inventorys.find(iv => iv._id === _id);
        if (!currentInven) return;

        setInventoryArray((prev) => {
            const exists = prev.some(iv => iv._id === _id);
            const next = exists
            ? prev.filter(iv => iv._id !== _id)
            : [...prev, currentInven];
        
            setAllChecked(next.length === inventorys.length);
            return next;
        });
    };

    //단일 삭제
    const handleClickInvenDelete = async (_id: string) => {
        try{
            const data = await inventoryDeleteApi(_id);

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            router.refresh();
            return;
        } catch(err: any) {
            console.log(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };

    //일괄 삭제
    const handleClickInvenAllDelete = async () => {
        try{
            const data = await inventoryAllDeleteApi(inventoryArray);

            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            alert(`${data.message}`);
            router.refresh();
            setAllChecked(false);
            return;
        } catch(err: any) {
            console.log(err.response?.data?.message);
            alert(`${err.response?.data?.message}`);
            return;
        }
    };
    
    return (
        <div
            style={{
                height: `${pathName !== "/admin/admin_main" ? "70vh" : "83%"}`,
                overflow: "auto",
            }}
        >
            <table className='admin-table'>
                <tbody>
                    <tr>
                        {
                            pathName !== "/admin/admin_main" && 
                            (
                                <th>
                                    <input 
                                        type="checkbox"
                                        checked={allChecked}
                                        onChange={handleAllChecked}
                                    />
                                </th>
                            )
                        }
                        <th>분류</th>
                        <th>재고명</th>
                        <th>재고 수량</th>
                        <th>상태</th>
                        <th></th>
                    </tr>
                    {
                        inventorys?.map((inven) => (
                            <tr key={inven._id}>
                                {
                                    pathName !== "/admin/admin_main" && 
                                    (
                                        <td>
                                            <input 
                                                type="checkbox"
                                                checked={inventoryArray.some(iv => iv._id === inven._id)}
                                                onChange={() => {
                                                    handleInvenChecked(inven._id);
                                                }}
                                            />
                                        </td>
                                    ) 
                                }
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
                                {
                                    pathName !== "/admin/admin_main" && 
                                    (
                                        <td>
                                            <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                                                <button
                                                    style={{color: "#4000ff"}}
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    style={{color: "#ff0000"}}
                                                    onClick={() => {
                                                        handleClickInvenDelete(inven._id)
                                                    }}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table> {/* .admin-table : end */}
            
            {
                pathName !== "/admin/admin_main" && 
                (
                    <button
                        className='inventory-form__regi'
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "50%",
                            transform: "translateX(-50%)"
                        }}
                        onClick={handleClickInvenAllDelete}
                    >
                        일괄삭제
                    </button>
                )
            }
        </div>
    );
};

export default InventoryList;