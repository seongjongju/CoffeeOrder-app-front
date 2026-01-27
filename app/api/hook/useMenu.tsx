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
    const results = useSuspenseQueries({
        queries: [
            { queryKey: ['iceCoffee'], queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/ice-coffee`).then(res => res.data) },
            { queryKey: ['hotCoffee'], queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/hot-coffee`).then(res => res.data) },
            { queryKey: ['juice'], queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/juice`).then(res => res.data) },
            { queryKey: ['dessert'], queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_FRONT_API_URL}/api/dessert`).then(res => res.data) },
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