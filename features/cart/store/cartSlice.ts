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
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;