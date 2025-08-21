import Link from 'next/link';
import React from 'react';
import styles from '../home.module.css';

const NoticeSection = () => {
    return (
        <section>
            <div className="inner">
                <h2 className='title' style={{ marginBottom : '5px' }}>NOTICE</h2>
                <Link href={''} className={styles.more_link}>More +</Link>
                <ul className={styles.notice}>
                    <li className={styles.notice_item}>
                        <Link href={''} className={styles.notice_link}>
                            <p className={styles.notice_title}>공지사항 제목</p>
                            <span className={styles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={styles.notice_item}>
                        <Link href={''} className={styles.notice_link}>
                            <p className={styles.notice_title}>공지사항 제목</p>
                            <span className={styles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={styles.notice_item}>
                        <Link href={''} className={styles.notice_link}>
                            <p className={styles.notice_title}>공지사항 제목</p>
                            <span className={styles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                    <li className={styles.notice_item}>
                        <Link href={''} className={styles.notice_link}>
                            <p className={styles.notice_title}>공지사항 제목</p>
                            <span className={styles.date}>2025.08.21</span>
                        </Link>
                    </li> {/* notice_item */}
                </ul> {/* notice */}
            </div> {/* inner */}
        </section>
    );
};

export default NoticeSection;