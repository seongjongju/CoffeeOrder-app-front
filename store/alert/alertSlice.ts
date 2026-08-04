import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

interface AlertItem {
    userId: string;
    text: string;
};

interface AlertState {
    items: AlertItem[]
};

const initialState: AlertState = {
    items: []
};

const id = nanoid();

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        addToAlert: (state, action) => {
            state.items.push({
                _id: id,
                ...action.payload
            })
        },
        allDeleteAlert: (state) => {
            state.items = [];
        },
    },
});

export const {addToAlert, allDeleteAlert} = alertSlice.actions;
export default alertSlice.reducer;