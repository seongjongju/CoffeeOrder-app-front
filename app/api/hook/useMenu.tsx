'use client';
import axios from 'axios';
import { useSuspenseQueries} from '@tanstack/react-query';

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
    const isClient = typeof window !== 'undefined';
    const BASE_URL = process.env.NEXT_PUBLIC_FRONT_API_URL || 'http://localhost:3000';
    
    const results = useSuspenseQueries({
        queries: [
            { 
                queryKey: ['iceCoffee'], 
                queryFn: () => isClient 
                    ? axios.get(`${BASE_URL}/api/ice-coffee`).then(res => res.data) 
                    : Promise.resolve([]) 
            },
            { 
                queryKey: ['hotCoffee'], 
                queryFn: () => isClient 
                    ? axios.get(`${BASE_URL}/api/hot-coffee`).then(res => res.data) 
                    : Promise.resolve([]) 
            },
            { 
                queryKey: ['juice'], 
                queryFn: () => isClient 
                    ? axios.get(`${BASE_URL}/api/juice`).then(res => res.data) 
                    : Promise.resolve([]) 
            },
            { 
                queryKey: ['dessert'], 
                queryFn: () => isClient 
                    ? axios.get(`${BASE_URL}/api/dessert`).then(res => res.data) 
                    : Promise.resolve([]) 
            },
        ],
    });

    const iceCoffeeState = results[0].data as menuType[];
    const hotCoffeeState = results[1].data as menuType[];
    const juiceState = results[2].data as menuType[];
    const dessertState = results[3].data as menuType[];

    //전체메뉴
    const menus = [...iceCoffeeState, ...hotCoffeeState, ...juiceState, ...dessertState];

    return {
        iceCoffeeState,
        hotCoffeeState,
        juiceState,
        dessertState,
        menus
    }
};

export default useMenu;