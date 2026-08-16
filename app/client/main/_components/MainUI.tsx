import React, { Suspense } from 'react';
import '../_styled/main.css';
import MainVisual from './MainVisual';
import Suggestion from './Suggestion';
import MenuTabItems from './MenuTabItems';
import LatelyOrder from './LatelyOrder';
import LoadingUi from '@/shared/client/components/loading/LoadingUi';

const MainUI = () => {
    
    return (
        <main className='main'>
            <Suspense fallback={<LoadingUi />}>
                <MainVisual />
                
                <div className='inner'>
                    <h2 className='main-title'>추천 메뉴!!</h2> 
                </div>
                <Suggestion />

                <LatelyOrder />
                
                <div className='inner'>
                    <h2 className='main-title'>주문 하기!!</h2>             
                    <MenuTabItems />
                </div>
            </Suspense>
        </main>
    );
};

export default MainUI;