'use client';
import Link from 'next/link';
import {MenuTabInput, MenuWrap, MenuItem, FailTextWrap} from '@/shared/styled/MainStyled';
import React, { useState } from 'react';
import useMenu from '@/app/api/hook/useMenu';
import { mainColor } from '@/shared/styled/GlobalStyled';

interface tabStateType {
    coffee: boolean;
    juice: boolean;
    dessert: boolean;
};

const MenuTabItems = ({ coffee, juice, dessert }:tabStateType) => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();
    const [menuSearch, setMenuSearch] = useState<string>(""); //메뉴 검색

    /*  
        메뉴 검색
        1. 메뉴 명에 포함된 글씨가 있으면 검색 된다.
        2. 검색 시 해당 메뉴가 있는 탭으로 변경 된다.
    */  
    //아이스 커피
    const filterdIceCoffee = iceCoffeeState.filter((menu) => menu.menuname.toLowerCase().includes(menuSearch.toLowerCase()))
                                    .map((iceCoffee) => (
                                        <MenuItem key={iceCoffee?.id} >
                                            <img src={iceCoffee?.img} alt={iceCoffee?.menuname} />
                                            <p>{iceCoffee?.menuname}</p>
                                        </MenuItem>
                                    ));

    //뜨거운 커피
    const filterdHotCoffee = hotCoffeeState.filter((menu) => menu.menuname.toLowerCase().includes(menuSearch.toLowerCase()))
                                    .map((hotCoffee) => (
                                        <MenuItem key={hotCoffee?.id} >
                                            <img src={hotCoffee?.img} alt={hotCoffee?.menuname} />
                                            <p>{hotCoffee?.menuname}</p>
                                        </MenuItem>
                                    ));


    //주스 필터
    const filterdJuice = juiceState.filter((menu) => menu.menuname.toLowerCase().includes(menuSearch.toLowerCase()))
                                    .map((juice) => (
                                        <MenuItem key={juice?.id} >
                                            <img src={juice?.img} alt={juice?.menuname} />
                                            <p>{juice?.menuname}</p>
                                        </MenuItem>
                                    ));

    //디저트 필터
    const filterdDessert = dessertState.filter((menu) => menu.menuname.toLowerCase().includes(menuSearch.toLowerCase()))
                                        .map((dessert) => (
                                            <MenuItem key={dessert?.id} >
                                                <img src={dessert?.img} alt={dessert?.menuname} />
                                                <p>{dessert?.menuname}</p>
                                            </MenuItem>
                                        ));

    return (
        <div>
            <MenuTabInput 
                type="text" 
                placeholder={coffee ? "커피 검색" : juice ? "주스 검색" : dessert ? "디저트 검색" : ""}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setMenuSearch(e.target.value);}}
            />
            
            {
                coffee &&
                filterdIceCoffee.length !== 0 || filterdHotCoffee.length !== 0 ?
                (
                    <MenuWrap
                        style={
                            {display: coffee ? "grid" : "none"}
                        }
                    >   
                        {filterdIceCoffee}
                        {filterdHotCoffee}
                    </MenuWrap>
                ) : (
                    <FailTextWrap
                        style={
                            {display: coffee ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </FailTextWrap>
                )
            }
                
            {
                juice && 
                filterdJuice.length !== 0 ?
                (
                    <MenuWrap
                        style={
                            {display: juice ? "grid" : "none"}
                        }
                    >
                        {filterdJuice}
                    </MenuWrap>
                ) : (
                    <FailTextWrap
                        style={
                            {display: juice ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </FailTextWrap>
                )
            }

            {
                dessert && 
                filterdDessert.length !== 0 ? 
                (
                    <MenuWrap
                        style={
                            {display: dessert ? "grid" : "none" }
                        }
                    >
                        {filterdDessert}
                    </MenuWrap>
                ) : (
                    <FailTextWrap
                        style={
                            {display: dessert ? "flex" : "none"}
                        }
                    >
                        <p>검색 결과가 없습니다.</p>
                    </FailTextWrap>
                )
            }
        </div>
    );
};

export default MenuTabItems;