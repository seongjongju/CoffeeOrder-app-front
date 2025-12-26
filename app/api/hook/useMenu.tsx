'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type menuType = {
    id: number;
    type: string;
    img: string;
    menuname: string;
    price: number;
    info: {
        volume: number;
        calorie: number;
        carbohydrate: number;
        protein: number;
        fat: number;
        caffeine: number;
        sodium: number;
        sugar: number;
        saturatedfat: number;
    };
    origin: string;
};

const useMenu = () => {
    const [iceCoffeeState, setIceCoffeeState] = useState<menuType[]>([]); 
    const [hotCoffeeState, setHotCoffeeState] = useState<menuType[]>([]); 
    const [juiceState, setJuiceState] = useState<menuType[]>([]); 
    const [dessertState, setDessertState] = useState<menuType[]>([]); 

    //아이스 커피
    useEffect(() => {
        const iceCoffee = async () => {
            try{
                const res = await axios.get('/api/ice-coffee');
                
                if(!res || !res.data) return;

                setIceCoffeeState(res.data);

            }catch(err) {
                console.error("아이스 커피 호출 실패" , err);
            };
        };

        iceCoffee();
    }, []);

    //hot 커피
    useEffect(() => {
        const hotCoffee = async () => {
            try{
                const res = await axios.get('/api/hot-coffee');
                
                if(!res || !res.data) return;

                setHotCoffeeState(res.data);

            }catch(err) {
                console.error("뜨거운 커피 호출 실패" , err);
            };
        };

        hotCoffee();
    }, []);

    //주스
    useEffect(() => {
        const juice = async () => {
            try{
                const res = await axios.get('/api/juice');
                
                if(!res || !res.data) return;

                setJuiceState(res.data);

            }catch(err) {
                console.error("주스 호출 실패" , err);
            };
        };

        juice();
    }, [])

    //디저트
    useEffect(() => {
        const dessert = async () => {
            try{
                const res = await axios.get('/api/dessert');
                
                if(!res || !res.data) return;

                setDessertState(res.data);

            }catch(err) {
                console.error("디저트 호출 실패" , err);
            };
        };

        dessert();
    }, [])

    return {
        iceCoffeeState,
        hotCoffeeState,
        juiceState,
        dessertState
    }
};

export default useMenu;