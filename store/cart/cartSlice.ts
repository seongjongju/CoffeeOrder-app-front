import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid'

interface CartItem {
    cartId: string;
    lightly: boolean; 
    shot: number; 
    syrup: number; 
    whipping: number; 
    price: number;
    count: number;
    img: string;
    menuName: string;
};

interface CartState {
    items: CartItem[]
};

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, "cartId">>) => {
            state.items.push({
                cartId: nanoid(),
                ...action.payload
            })
        },
        incrementToCart: (state, action:PayloadAction<string>) => {
            const item = state.items.find(i => i.cartId === action.payload);
            if(item) {
                if(item.count < 10) item.count += 1;
            }
        },
        decrementToCart: (state, action:PayloadAction<string>) => {
            const item = state.items.find(i => i.cartId === action.payload);
            if(item) {
                if(item.count > 1) item.count -= 1;
            }
        },
        delateToCart: (state, action:PayloadAction<string>) => {
            const item = state.items.find(i => i.cartId === action.payload);
            const newItems = state.items.filter((j) => j.cartId !== item?.cartId);

            state.items = newItems;
        },
        allDeleteCart: (state) => {
            state.items = [];
        },
    }
});

export const {
    addToCart, 
    incrementToCart, 
    decrementToCart, 
    delateToCart, 
    allDeleteCart,
} = cartSlice.actions;
export default cartSlice.reducer;