'use client';
import Link from 'next/link';
import '@/shared/styled/main/main.css';
import React, { useEffect, useState } from 'react';
import useMenu from '@/app/api/hook/useMenu';
interface tabStateType {
    coffee: boolean;
    juice: boolean;
    dessert: boolean;
};

const MenuTabItems = ({ coffee, juice, dessert }:tabStateType) => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
    const [menuSearch, setMenuSearch] = useState<string>(""); //메뉴 검색
    const [debounceSearch, setDebounceSearch] = useState(""); //디바운스

    //아이스 커피
    const filterdIceCoffee = iceCoffeeState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((iceCoffee) => (
        <div className='menu-item' key={iceCoffee?.id} >
            <img src={iceCoffee?.img} alt={iceCoffee?.menuname} />
            <p>{iceCoffee?.menuname}</p>
        </div>
    ));

    //뜨거운 커피
    const filterdHotCoffee = hotCoffeeState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((hotCoffee) => (
        <div className='menu-item' key={hotCoffee?.id} >
            <img src={hotCoffee?.img} alt={hotCoffee?.menuname} />
            <p>{hotCoffee?.menuname}</p>
        </div>
    ));


    //주스 필터
    const filterdJuice = juiceState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((juice) => (
        <div className='menu-item' key={juice?.id} >
            <img src={juice?.img} alt={juice?.menuname} />
            <p>{juice?.menuname}</p>
        </div>
    ));

    //디저트 필터
    const filterdDessert = dessertState
    .filter((menu) => menu.menuname.toLowerCase().includes(debounceSearch.toLowerCase()))
    .map((dessert) => (
        <div className='menu-item' key={dessert?.id} >
            <img src={dessert?.img} alt={dessert?.menuname} />
            <p>{dessert?.menuname}</p>
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
            <input
                className='menu-tab-input' 
                type="text" 
                placeholder={coffee ? "커피 검색" : juice ? "주스 검색" : dessert ? "디저트 검색" : ""}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMenuSearch(e.target.value);}}
            />
            
            {
                coffee &&
                filterdIceCoffee.length !== 0 || filterdHotCoffee.length !== 0 ?
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: coffee ? "grid" : "none"}
                        }
                    >   
                        {filterdIceCoffee}
                        {filterdHotCoffee}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: coffee ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            }
                
            {
                juice && 
                filterdJuice.length !== 0 ?
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: juice ? "grid" : "none"}
                        }
                    >
                        {filterdJuice}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: juice ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )
            }

            {
                dessert && 
                filterdDessert.length !== 0 ? 
                (
                    <div
                        className='menu-wrap'
                        style={
                            {display: dessert ? "grid" : "none" }
                        }
                    >
                        {filterdDessert}
                    </div>
                ) : (
                    <div
                        className='fail-text-wrap'
                        style={
                            {display: dessert ? "flex" : "none"}
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