import NoticeView from '@/features/notice/components/id/NoticeView';
import Link from 'next/link';
import React from 'react';
import buttonStyles from '@/shared/components/Form/Button/Button.module.css';

const NoticeViewPage = () => {
    return (
        <main>
            <section>
                <div className='inner'>
                    <h2 className='sub_title'>공지사항</h2>
                    <NoticeView />
                    <Link href={'/notice'} className={buttonStyles.common_button_short}>목록</Link>
                </div> {/* inner */}
            </section>
        </main>
    );
};

export default NoticeViewPage;