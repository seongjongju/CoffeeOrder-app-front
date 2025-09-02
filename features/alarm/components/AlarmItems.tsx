import React from 'react';
import alarmStyles from '../alarm.module.css';
import Image from 'next/image';
import coffeeIco from '@/shared/assets/images/ico/coffee_ico.svg';
import { AlarmItemsProps } from '../types/alarmTypes';

const AlarmItems = ({ productName, alarmText, alarmDate }: AlarmItemsProps) => {
    return (
        <div className={alarmStyles.alarm_item}>
            <div className={alarmStyles.alarm_item_wrap}>
                <Image  src={coffeeIco} alt='커피 아이콘' />
                <p className={alarmStyles.alarm_text}>{`${productName} ${alarmText}`}</p>
            </div>
            <span className='date'>{alarmDate}</span>
        </div>
    );
};

export default AlarmItems;