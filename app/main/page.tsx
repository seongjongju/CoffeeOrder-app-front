import '@/shared/styled/main/main.css';
import MenuTabItems from '@/app/main/_components/MenuTabItems';
import Suggestion from './_components/Suggestion';
import MainVisual from './_components/MainVisual';

const MainPage = () => {
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

export default MainPage;