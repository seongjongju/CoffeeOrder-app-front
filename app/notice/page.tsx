import NoticeLists from '@/features/notice/components/NoticeLists';
import React from 'react';

const NoticePage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='sub_title'>공지사항</h2>
                    <NoticeLists />
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default NoticePage;