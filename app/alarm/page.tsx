import AlarmItems from '@/features/alarm/components/AlarmItems';
import React from 'react';

const AlarmPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <AlarmItems 
                        productName={'아메리카노'}
                        alarmText={'주문이 완료되었습니다.'}
                        alarmDate={'2023-03-15'}
                    />
                    <AlarmItems 
                        productName={'카페라떼'}
                        alarmText={'주문이 완료되었습니다.'}
                        alarmDate={'2023-03-16'}
                    />
                </div>
            </section>
        </main>
    );
};

export default AlarmPage;