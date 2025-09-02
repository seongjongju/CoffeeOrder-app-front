import NoticeLists from '@/features/notice/components/NoticeLists';
import React from 'react';

const NoticePage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <NoticeLists />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default NoticePage;