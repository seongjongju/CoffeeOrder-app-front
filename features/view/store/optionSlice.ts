import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

interface Options { 
    lightly: boolean; 
    shot: number; 
    syrup: number; 
    whipping: number; 
    price: number;
    count: number;
}; 

interface OptionState { 
    lightly: boolean; 
    shot: number; 
    syrup: number; 
    whipping: number; 
    price: number;
    count: number;
}; 

const initialState: OptionState = { 
    lightly: false, 
    shot: 0, 
    syrup: 0, 
    whipping: 0,
    price: 0,
    count: 1,
}; 

const optionSlice = createSlice({ 
    name: 'option', 
    initialState, 
    reducers: { 
        setOption: (state, action: PayloadAction<Partial<Options>>) => { 
            Object.assign(state, action.payload);
        }, 
        resetOption: () => initialState,
    } 
}); 
    
export const {setOption, resetOption} = optionSlice.actions; 
export default optionSlice.reducer;