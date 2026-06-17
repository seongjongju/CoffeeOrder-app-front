import React from 'react';
import MainVisual from './MainVisual';
import Suggestion from './Suggestion';
import MenuTabItems from './MenuTabItems';

const MainUI = () => {
    
    return (
        <main className='main'>
            <MainVisual />
            <div className='inner'>
                <h2 className='main-title'>추천 메뉴!!</h2> 
            </div>
            <Suggestion />
            
            <div className='inner'>
                <h2 className='main-title'>주문 하기!!</h2>             
                <MenuTabItems />
            </div>
        </main>
    );
};

export default MainUI;