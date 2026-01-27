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
    /* const [iceCoffeeState, setIceCoffeeState] = useState<menuType[]>([]); 
    const [hotCoffeeState, setHotCoffeeState] = useState<menuType[]>([]); 
    const [juiceState, setJuiceState] = useState<menuType[]>([]); 
    const [dessertState, setDessertState] = useState<menuType[]>([]);  */

    const results = useSuspenseQueries({
        queries: [
            { queryKey: ['iceCoffee'], queryFn: () => axios.get('/api/ice-coffee').then(res => res.data) },
            { queryKey: ['hotCoffee'], queryFn: () => axios.get('/api/hot-coffee').then(res => res.data) },
            { queryKey: ['juice'], queryFn: () => axios.get('/api/juice').then(res => res.data) },
            { queryKey: ['dessert'], queryFn: () => axios.get('/api/dessert').then(res => res.data) },
        ],
    });


    //아이스 커피
    /* useEffect(() => {
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
    }, []); */

    //hot 커피
   /*  useEffect(() => {
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
    }, []); */

    //주스
    /* useEffect(() => {
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
    }, []) */

    //디저트
    /* useEffect(() => {
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
    }, []); */

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