'use client';
import { InventoryProps } from '@/app/admin/admin_inventory/_components/InventoryInterface';
import InventoryUpdateModal from '@/app/admin/admin_inventory/_components/InventoryUpdateModal';
import { Inventory } from '@/app/types/inventorys/inventory';
import { inventoryAllDeleteApi, inventoryDeleteApi } from '@/features/adminApi/adminInventoryApi';
import useAdminModal from '@/features/hooks/admin/modal/useAdminModal';
import useLoading from '@/features/hooks/loading/useLoading';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import AdminLoadingUI from '../loading/AdminLoadingUI';

const InventoryList = ({ inventorys, params }: InventoryProps) => {
    const {isLoading, setIsLoading} = useLoading();   
    const router = useRouter();
    const pathName = usePathname();
    const searchParams =  useSearchParams().get('q') || ""; //검색어
    const {setModalToggle, modalToggle} = useAdminModal(); //모달창 토글 커스텀 훅
    const [inventoryArray, setInventoryArray] = useState<Inventory['inventorys']>([]);
    const [allChecked, setAllChecked] = useState(false); // Delete용 전체 체크

    // Update시, 어떤 재고의 행을 선택했는지 고유 아이디 값 전달용
    const [invenId, setInvenId] = useState<string>(""); 

    //메인 페이지가 아니라면 카테고리 필터링을 적용한다.
    const categoryFiltered = useMemo(() => {
        return pathName.includes('/admin_inventory') && params !== undefined 
                ? inventorys.filter(iv => iv.category === params) 
                : inventorys;
    }, [pathName, params, inventorys]);

    //메인 페이지가 아니라면 검색을 적용한다.
    // 재고가 부족한 순
    const searchFiltered = useMemo(() => {
        const filteredList = pathName.includes('/admin_inventory') && searchParams !== "" 
            ? categoryFiltered.filter(iv => iv.inventoryName.includes(searchParams.trim().toUpperCase())) 
            : categoryFiltered;

        return [...filteredList].sort((a, b) => Number(a.quantity) - Number(b.quantity));

    }, [pathName, searchParams, categoryFiltered]);
    
    
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
            setIsLoading(true);

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
        } finally {
            setIsLoading(false);
        }
    };

    //일괄 삭제
    const handleClickInvenAllDelete = async () => {
        try{
            setIsLoading(true);

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
        } finally {
            setIsLoading(false);
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
                    <tr style={{ 
                        position: "sticky",
                        top: "0"
                    }}>
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
                        {
                            pathName !== "/admin/admin_main" &&
                            (
                                <th>설정</th>
                            )  
                        }
                    </tr>
                    {
                        searchFiltered?.map((inven) => (
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
                                <td>{inven.quantity} 회</td>
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
                                                    onClick={() => {
                                                        setModalToggle("inven-update");
                                                        setInvenId(inven._id)
                                                    }}
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
                modalToggle === "inven-update" &&
                (
                    <InventoryUpdateModal 
                        inventorys={inventorys}
                        setModalToggle={setModalToggle}
                        modalToggle={modalToggle}
                        invenId={invenId}
                    />
                )
            }
            
            {
                pathName !== "/admin/admin_main" && 
                (
                    <button
                        className='admin-form__regi'
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

            {
                isLoading &&
                (
                    <AdminLoadingUI 
                        isLoading={isLoading}
                    />
                ) 
            }
        </div>
    );
};

export default InventoryList;