import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface User {
    _id: string;
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    birth: string;
};

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
};

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout:(state) => {
            state.user = null;
            state.isLoggedIn = false
        },
    },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;

