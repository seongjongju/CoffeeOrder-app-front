import Link from 'next/link';
import React from 'react';
import homeStyles from '../home.module.css';
import NoticeLists from '@/features/notice/components/NoticeLists';

const NoticeSection = () => {
    return (
        <section>
            <div className="inner">
                <h2 className='title' style={{ marginBottom : '5px' }}>NOTICE</h2>
                <Link href={'/notice'} className={homeStyles.more_link}>More +</Link>
                <NoticeLists />
            </div> {/* inner */}
        </section>
    );
};

export default NoticeSection;