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
    userId: 'USER_ID',
    userPassword: 'USER_PASSWORD',
    userPasswordCheck: 'USER_PASSWORD_CHECK',
    userName: 'USER_NAME',
    userPhoneNumber: 'USER_PHONE_NUMBER',
    userEmail: 'USER_EMAIL',
    userCertificationNumber: 'USER_CERTIFICATION_NUMBER',
    userBirth: 'USER_BIRTH'
}

type ReducerType = {
    state: typeof initialvalue,
    action: {type: string, payload: string}
};

const reducer = (state: ReducerType['state'], action: ReducerType['action']) => {
    switch(action.type) {
        case reducerActionTypes.userId:
            return {...state, id: action.payload};
        case reducerActionTypes.userPassword:
            return {...state, password: action.payload};
        case reducerActionTypes.userPasswordCheck:
            return {...state, passwordCheck: action.payload};
        case reducerActionTypes.userName:
            return {...state, name: action.payload};
        case reducerActionTypes.userPhoneNumber:
            return {...state, phoneNumber: action.payload};
        case reducerActionTypes.userEmail: 
            return {...state, email: action.payload};
        case reducerActionTypes.userCertificationNumber:
            return {...state, certificationNumber: action.payload};
        case reducerActionTypes.userBirth:
            return {...state, birth: action.payload};
        default:
            return state;
    }; 
};

const useSignUpInputState = () => {
    const [signUpState, dispatch] = useReducer(reducer, initialvalue);

    console.log(signUpState);

    const signUpInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>, type:string) => {
            dispatch({ type: type, payload: e.target.value });
        }, [signUpState]);

    return {
        signUpState, dispatch, signUpInputChange, reducerActionTypes
    }
};

export default useSignUpInputState;