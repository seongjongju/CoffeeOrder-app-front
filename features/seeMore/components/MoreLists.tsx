import Link from 'next/link';
import React from 'react';
import seeMoreStyles from '../seeMore.module.css';
import Image from 'next/image';
import moreArrow from '@/shared/assets/images/ico/more_arrow.svg';

const MoreLists = () => {
    return (
        <ul>
            <li className={seeMoreStyles.morelist_item}>
                <Link href={'/orderHistory'} className={`${seeMoreStyles.seemore_link} ${seeMoreStyles.morelist_link}`}>
                    주문내역
                    <Image  src={moreArrow} alt='화살표' />
                </Link>
            </li> {/* .morelist_item */}
            <li className={seeMoreStyles.morelist_item}>
                <Link href={'/couponBox'} className={`${seeMoreStyles.seemore_link} ${seeMoreStyles.morelist_link}`}>
                    쿠폰함
                    <Image  src={moreArrow} alt='화살표' />
                </Link>
            </li> {/* .morelist_item */}
            <li className={seeMoreStyles.morelist_item}>
                <Link href={'/notice'} className={`${seeMoreStyles.seemore_link} ${seeMoreStyles.morelist_link}`}>
                    공지사항
                    <Image  src={moreArrow} alt='화살표' />
                </Link>
            </li> {/* .morelist_item */}
            <li className={seeMoreStyles.morelist_item}>
                <Link href={''} className={`${seeMoreStyles.seemore_link} ${seeMoreStyles.morelist_link}`}>
                    이용 약관
                    <Image  src={moreArrow} alt='화살표' />
                </Link>
            </li> {/* .morelist_item */}
        </ul> 
    );
};

export default MoreLists;