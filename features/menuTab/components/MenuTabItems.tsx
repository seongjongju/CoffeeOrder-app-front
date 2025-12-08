'use client';
import Link from 'next/link';
import {MenuTabInput, MenuWrap, MenuItem} from '@/shared/styled/MainStyled';
import React from 'react';
import useMenu from '@/app/api/hook/useMenu';

const MenuTabItems = () => {
    const {iceCoffeeState, hotCoffeeState, juiceState, dessertState} = useMenu();

    //아이스커피
    const iceCoffeeItem = iceCoffeeState.map((iceCoffee) => (
        <MenuItem key={iceCoffee?.id} >
            <img src={iceCoffee?.img} alt={iceCoffee?.menuname} />
            <p>{iceCoffee?.menuname}</p>
        </MenuItem>
    ));

    //뜨거운 커피
    const hotCoffeeItem = hotCoffeeState.map((hotCoffee) => (
        <MenuItem key={hotCoffee?.id} >
            <img src={hotCoffee?.img} alt={hotCoffee?.menuname} />
            <p>{hotCoffee?.menuname}</p>
        </MenuItem>
    ));

    return (
        <div>
            <MenuTabInput 
                type="text" 
                placeholder="커피를 입력해주세요."
            />
            <MenuWrap>
                {iceCoffeeItem}
                {hotCoffeeItem}
            </MenuWrap>
        </div>
    );
};

export default MenuTabItems;