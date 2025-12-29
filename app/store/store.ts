import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/login/store/authSlice';
import optionReducer from '@/features/view/store/optionSlice';
import cartReducer from '@/features/cart/store/cartSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        option: optionReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch