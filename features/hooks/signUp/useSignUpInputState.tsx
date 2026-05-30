'use client';
import React, { useCallback, useReducer } from 'react';

const initialvalue = {
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    phoneNumber: '',
    email: '',
    certificationNumber: '',
    birth: ''
} 

const reducerActionTypes = {
    setField: "SET_FIELD",
    resetField: "RESET_FIELD",
} as const

type State = typeof initialvalue;

type Action = 
    | {type: "SET_FIELD"; field: keyof State; payload: string}
    | {type: "RESET_FIELD"; field: keyof State; payload?: string}

const reducer = (state: State, action: Action) => {
    switch(action.type) {
        case "SET_FIELD":
            return {...state, [action.field]: action.payload};

        case "RESET_FIELD":
            return {...state, [action.field]: action.payload ?? initialvalue[action.field]};
        
        default:
            return state;
    }
};

const useSignUpInputState = () => {
    const [signUpState, dispatch] = useReducer(reducer, initialvalue);

    const signUpInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>, field: keyof State) => {
        let value = e.target.value;

        console.log(field)

        if (field === 'phoneNumber') {
            value = value.replace(/\D/g, '').slice(0, 11); 
        }

        dispatch({ type: reducerActionTypes.setField, field, payload: value });
    }, []);
    
    const signUpInputReset = useCallback((field: keyof State, value?: string) => {
        dispatch({ type: reducerActionTypes.resetField, field, payload: value })
    }, []);
    

    return {
        signUpState, signUpInputChange, signUpInputReset
    }
};

export default useSignUpInputState;