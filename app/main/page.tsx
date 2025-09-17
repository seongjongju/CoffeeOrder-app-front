'use client';
import { useAppSelector } from '@/features/login/store/hooks';
import React from 'react';

const MainPage = () => {
    const {user, isLoggedIn} = useAppSelector(state => state.auth);
    return (
        <div>
            {isLoggedIn === true ? <p>{user?.name}</p> : null}
        </div>
    );
};

export default MainPage;