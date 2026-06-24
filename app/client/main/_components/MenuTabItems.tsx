'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useProductQuery from '@/features/hooks/query/useProductQuery';
import { CldImage } from 'next-cloudinary';
import { ProductGetType } from '@/app/types/products/product';

const menuTabs = [
    {id: "tab_0", tab: "커피"},
    {id: "tab_1", tab: "에이드"},
    {id: "tab_2", tab: "디저트"},
];

const MenuTabItems = () => {
    const {products} = useProductQuery();//전체 제품    
    const [tabState, setTabState] = useState<string>(menuTabs[0].id); //탭메뉴
    const [menuSearch, setMenuSearch] = useState<string>(""); //메뉴 검색
    const [debounceSearch, setDebounceSearch] = useState<ProductGetType['products']>([]); //디바운스

    //탭 메뉴의 탭명과, 전체 메뉴의 카테고리가 같은 것
    const findTab = menuTabs.find(tab => tab.id === tabState)?.tab;
    const filteredProducts = products.filter(prd => prd.category === findTab);

    // 검색
    const searched = filteredProducts.filter(prd => prd.productName.toLowerCase().includes(menuSearch.trim().toLowerCase()));

    //디바운싱
    useEffect(() => {
        const searchTimer = setTimeout(() => {
            setDebounceSearch(searched);
        }, 300);
        
        return () => {
            clearTimeout(searchTimer);
        };
    }, [searched]);

    return (
        <div style={{ marginBottom: "20px" }}>
            <div className='tab-btns'>
                {
                    menuTabs.map((tab) => (
                        <button 
                            key={tab.id}
                            className={`tab-btn ${tabState === tab.id ? "is-active" : ""}`}
                            onClick={() => setTabState(tab.id)}
                        >
                            {tab.tab}
                        </button>
                    ))
                }
            </div>

            <input
                className='menu-tab-input' 
                type="text" 
                placeholder={menuTabs.find(tab => tab.id === tabState)?.tab + "를 검색해주세요."}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMenuSearch(e.target.value);}}
            />
            
            <div
                className='menu-wrap'
                style={
                    {display: debounceSearch.length > 0 ? "grid" : "block"}
                }
            >   
                {
                    debounceSearch.length > 0 ?
                    (
                        debounceSearch.map((prd) => {
                            return(
                                <Link 
                                    key={prd.productCode}
                                    href={`/client/view/${prd.productCode}?category=${prd.category}`}
                                    className='menu-item'
                                >
                                    <CldImage
                                        src={prd.img.publicId}
                                        width={500}
                                        height={500}
                                        alt={prd.img.imgName}
                                    />
                                    <p>{prd.productName}</p>
                                </Link> 
                            )
                        })
                    ) :
                    (
                        <div className='none-meun'>
                            제품이 없습니다.
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MenuTabItems;