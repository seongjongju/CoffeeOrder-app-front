import React from 'react';
import noticeStyles from '../notice.module.css';
import NoticeItems from './NoticeItems';

const NoticeLists = () => {
    return (
        <ul className={noticeStyles.notice_list}>
            <li className={noticeStyles.notice_headings}>
                <p>제목</p>
                <p>날짜</p>
            </li>
            <NoticeItems />
            <NoticeItems />
        </ul>
    );
};

export default NoticeLists;