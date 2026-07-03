import React from 'react';
import '../_styled/main.css';
import MainVisual from './MainVisual';
import Suggestion from './Suggestion';
import MenuTabItems from './MenuTabItems';
import LatelyOrder from './LatelyOrder';

const MainUI = () => {
    
    return (
        <main className='main'>
            <MainVisual />
            <div className='inner'>
                <h2 className='main-title'>추천 메뉴!!</h2> 
            </div>
            <Suggestion />

            <div className='inner'>
                <h2 className='main-title'>할인권!!</h2> 
            </div>

            <div className='inner'>
                <h2 className='main-title'>최근 주문한 메뉴!!</h2> 
            </div>
            <LatelyOrder />
            
            <div className='inner'>
                <h2 className='main-title'>주문 하기!!</h2>             
                <MenuTabItems />
            </div>
        </main>
    );
};

export default MainUI;