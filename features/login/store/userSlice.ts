import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userState {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    birth: string;
};

const initialState: userState = {
    id: '',
    name: '',
    phoneNumber: '',
    email: '',
    birth: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.email = action.payload.email;
            state.birth = action.payload.birth;
        },
        logoutAction: (state) => {
            state.id = '';
            state.name = '';
            state.phoneNumber = '';
            state.email = '';
            state.birth = '';
        },
    },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;