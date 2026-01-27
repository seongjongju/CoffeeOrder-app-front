'use client';
import Link from 'next/link';
import '@/shared/styled/main/main.css';
import React, { useEffect, useState } from 'react';
import useMenu from '@/features/menu/hook/useMenu';
import { useRouter } from 'next/navigation';

const MenuTabItems = () => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
    const [tabState, setTabState] = useState<{coffee: boolean, juice: boolean, dessert: boolean}>({
        coffee: true,
        juice: false,
        dessert: false
    });
    const [menuSearch, setMenuSearch] = useState<string>(""); //메뉴 검색
    const [debounceSearch, setDebounceSearch] = useState(""); //디바운스
    const router = useRouter();

    //아이스 커피
    const filteredIceCoffee = iceCoffeeState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((iceCoffee) => (
        <div className='menu-item' key={iceCoffee?.id} 
            onClick={() => {router.push(`/view/${iceCoffee.type}/${iceCoffee.id}`)}}
        >
            <img src={iceCoffee.img} alt={iceCoffee.menuname} />
            <p>{iceCoffee.menuname}</p>
        </div>
    ));

    //뜨거운 커피
    const filteredHotCoffee = hotCoffeeState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((hotCoffee) => (
        <div className='menu-item' key={hotCoffee?.id} 
            onClick={() => {router.push(`/view/${hotCoffee.type}/${hotCoffee.id}`)}}
        >
            <img src={hotCoffee.img} alt={hotCoffee.menuname} />
            <p>{hotCoffee.menuname}</p>
        </div>
    ));


    //주스 필터
    const filteredJuice = juiceState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((juice) => (
        <div className='menu-item' key={juice?.id} 
            onClick={() => {router.push(`/view/${juice.type}/${juice.id}`)}}
        >
            <img src={juice.img} alt={juice.menuname} />
            <p>{juice.menuname}</p>
        </div>
    ));

    //디저트 필터
    const filteredDessert = dessertState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((dessert) => (
        <div className='menu-item' key={dessert?.id} 
            onClick={() => {router.push(`/view/${dessert.type}/${dessert.id}`)}}
        >
            <img src={dessert.img} alt={dessert.menuname} />
            <p>{dessert.menuname}</p>
        </div>
    ));

    useEffect(() => {
        //0.3초 지나야 실제 검색어 반영
        const timer = setTimeout(() => {
            setDebounceSearch(menuSearch);
        }, 300);

        //타이머 클리어
        return () => clearTimeout(timer);
    }, [menuSearch])

    return (
        <div style={{ marginBottom: "20px" }}>
            <div className='tab-btns'>
                <button 
                    className='tab-btn' 
                    style={
                        {backgroundColor: (tabState.coffee && "#2B1B16") || undefined, color: (tabState.coffee && "#fff") || undefined,} 
                    }
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setTabState(prev => ({ ...prev, coffee: true, juice: false, dessert: false }))
                    }}>
                    커피
                </button>
                <button
                    className='tab-btn'
                    style={
                        {backgroundColor: (tabState.juice && "#2B1B16") || undefined, color: (tabState.juice && "#fff") || undefined,}
                    }
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setTabState(prev => ({ ...prev, coffee: false, juice: true, dessert: false }))
                    }}
                >
                    주스
                </button>
                <button
                    className='tab-btn' 
                    style={
                        {backgroundColor: (tabState.dessert && "#2B1B16") || undefined, color: (tabState.dessert && "#fff") || undefined,} 
                    }
                    onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setTabState(prev => ({ ...prev, coffee: false, juice: false, dessert: true }))
                    }}>
                    디저트
                </button>
            </div>

            <input
                className='menu-tab-input' 
                type="text" 
                placeholder={tabState.coffee ? "커피 검색" : tabState.juice ? "주스 검색" : tabState.dessert ? "디저트 검색" : ""}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMenuSearch(e.target.value);}}
            />
            
            {
                tabState.coffee &&
                filteredIceCoffee.length !== 0 || filteredHotCoffee.length !== 0 ?
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: tabState.coffee ? "grid" : "none"}
                        }
                    >   
                        {filteredIceCoffee}
                        {filteredHotCoffee}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: tabState.coffee ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            }
                
            {
                tabState.juice && 
                filteredJuice.length !== 0 ?
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: tabState.juice ? "grid" : "none"}
                        }
                    >
                        {filteredJuice}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: tabState.juice ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            }

            {
                tabState.dessert && 
                filteredDessert.length !== 0 ? 
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: tabState.dessert ? "grid" : "none" }
                        }
                    >
                        {filteredDessert}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: tabState.dessert ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            }
        </div>
    );
};

export default MenuTabItems;