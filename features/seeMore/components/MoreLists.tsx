import Link from 'next/link';
import React from 'react';
import styles from '../seeMore.module.css';
import Image from 'next/image';
import moreArrow from '@/shared/assets/images/ico/more_arrow.svg';

const MoreLists = () => {
    return (
        <section>
            <ul>
                <li className={styles.morelist_item}>
                    <Link href={''} className={`${styles.seemore_link} ${styles.morelist_link}`}>
                        주문내역
                        <Image  src={moreArrow} alt='화살표' />
                    </Link>
                </li> {/* .morelist_item */}
                <li className={styles.morelist_item}>
                    <Link href={''} className={`${styles.seemore_link} ${styles.morelist_link}`}>
                        쿠폰함
                        <Image  src={moreArrow} alt='화살표' />
                    </Link>
                </li> {/* .morelist_item */}
                <li className={styles.morelist_item}>
                    <Link href={''} className={`${styles.seemore_link} ${styles.morelist_link}`}>
                        공지사항
                        <Image  src={moreArrow} alt='화살표' />
                    </Link>
                </li> {/* .morelist_item */}
                <li className={styles.morelist_item}>
                    <Link href={''} className={`${styles.seemore_link} ${styles.morelist_link}`}>
                        이용 약관
                        <Image  src={moreArrow} alt='화살표' />
                    </Link>
                </li> {/* .morelist_item */}
            </ul> 
        </section>
    );
};

export default MoreLists;