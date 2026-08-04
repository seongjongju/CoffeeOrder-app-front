'use client';
import useAlert from '@/features/hooks/alert/useAlert';
import React from 'react';
import mascot from '@/public/images/mascot.png';
import './_styled/alert.css';

const AlertPage = () => {
    

    const {userAlerts} = useAlert();

    return (
        <main className='main'>
            <nav className='inner'>
                {
                    userAlerts.length > 0 ? 
                    (
                        <ul className='alert'>
                            {
                                userAlerts?.map((al) => (
                                    <li 
                                        key={al.text}
                                        className='alert__li'
                                    >
                                        <img
                                            className='alert__icon' 
                                            src={mascot.src} 
                                            alt="마스코트"
                                        />
                                        {al.text}
                                    </li>      
                                ))
                            }
                        </ul>
                    ) :
                    (
                        <p className='alert-none-text'>알림 내역 없음</p>
                    )
                }
            </nav>
        </main>
    );
};

export default AlertPage;