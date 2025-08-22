import Link from 'next/link';
import React from 'react';
import homeStyles from '../home.module.css';

const NoticeSection = () => {
    return (
        <section>
            <div className="inner">
                <h2 className='title' style={{ marginBottom : '5px' }}>NOTICE</h2>
                <Link href={''} className={homeStyles.more_link}>More +</Link>
                <ul className={homeStyles.notice}>
                    <li className={homeStyles.notice_item}>
                        <Link href={''} className={homeStyles.notice_link}>
                            <p className={homeStyles.notice_title}>공지사항 제목</p>
                            <span className={homeStyles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={homeStyles.notice_item}>
                        <Link href={''} className={homeStyles.notice_link}>
                            <p className={homeStyles.notice_title}>공지사항 제목</p>
                            <span className={homeStyles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={homeStyles.notice_item}>
                        <Link href={''} className={homeStyles.notice_link}>
                            <p className={homeStyles.notice_title}>공지사항 제목</p>
                            <span className={homeStyles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={homeStyles.notice_item}>
                        <Link href={''} className={homeStyles.notice_link}>
                            <p className={homeStyles.notice_title}>공지사항 제목</p>
                            <span className={homeStyles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                </ul> {/* notice */}
            </div> {/* inner */}
        </section>
    );
};

export default NoticeSection;