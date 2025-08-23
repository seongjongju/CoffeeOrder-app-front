import React from 'react';
import noticeStyles from '../../notice.module.css';

const NoticeView = () => {
    return (
        <div className={noticeStyles.notice_view}>
            <div className={noticeStyles.notice_view_headigns}>
                <p className={noticeStyles.notice_title}>공지사항 제목 공지사항 제목 공지사항 제목 공지사항 제목</p>
                <p className='date'>2025.08.23</p>
            </div>
            <div className={noticeStyles.notice_info}>
                <p className={noticeStyles.notice_text}>
                    공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용
                    공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용
                    공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용
                </p>
                <p className={noticeStyles.views}>조회수 : 1</p>
            </div>
        </div>
    );
};

export default NoticeView;