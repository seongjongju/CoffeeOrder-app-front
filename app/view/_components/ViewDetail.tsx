'use client';
import React from 'react';
import { infoType } from './ViewLayout';

interface viewInfoType {
    info: infoType,
    origin:string
};

const ViewDetail = ({ info, origin }:viewInfoType) => {
    return (
        <div className='view-detail'>
            <p className='view-title'>상세정보</p>
            <p className='view-detail__heading'>영양 - 1회 제공량 기준</p>
            <table className='view-detail__table'>
                <tbody>
                    <tr>
                        <th>용량 (ml)</th>
                        <td>{info.volume}</td>
                        <th>카페인 (mg)</th>
                        <td>
                            {
                                info.caffeine ? info.caffeine
                                : "-"
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>칼로리</th>
                        <td>{info.calorie}</td>
                        <th>나트륨 (mg)</th>
                        <td>{info.sodium}</td>
                    </tr>
                    <tr>
                        <th>탄수화물 (g)</th>
                        <td>{info.carbohydrate}</td>
                        <th>당류 (g)</th>
                        <td>{info.sugar}</td>
                    </tr>
                    <tr>
                        <th>단백질 (g)</th>
                        <td>{info.protein}</td>
                        <th>포화지방 (g)</th>
                        <td>{info.saturatedfat}</td>
                    </tr>
                </tbody>
            </table>
                            
            
            {
                origin &&  
                (
                    <div className='origin'>
                        <p className='view-detail__heading'>원산지</p>
                        <p className='view-detail__text'>{origin}</p>
                    </div>
                )
            }
        </div> 
    );
};

export default ViewDetail;