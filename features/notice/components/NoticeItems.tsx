import React from 'react';
import noticeStyles from '../notice.module.css';
import Link from 'next/link';

const NoticeItems = () => {
    return (
        <li className={noticeStyles.notice_item}>
            <Link href={'/noticeView'}>
                <p className={noticeStyles.notice_title}>
                    공지사항 제목
                </p>
                <p className='date'>
                    2025.08.23
                </p>
            </Link>
        </li>
    );
};

export default NoticeItems;