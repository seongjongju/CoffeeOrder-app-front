import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: any | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        logout: (state) => {
            state.user = null; 
            state.isLoggedIn = false;
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;