import { ProductType } from '@/app/types/products/product';
import React from 'react';

interface ProductDetailProps {
    productInfos: Array<ProductType>;
};


const ViewDetail = ({ productInfos }: ProductDetailProps) => {

    //console.log(productInfos)

    return (
        <div className='view-detail'>
            <p className='view-title'>상세정보</p>
            <p className='view-detail__heading'>영양 - 1회 제공량 기준</p>
            <div style={{display: "flex"}}>
                <table className='view-detail__table'>
                    <tbody>
                        {
                            productInfos.slice(0,4).map((info, i) => (
                                <tr key={info.id}>
                                    <th>{info.label}</th>
                                    <td>{info.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <table className='view-detail__table'>
                    <tbody>
                        {
                            productInfos.slice(4,8).map((info, i) => (
                                <tr key={info.id}>
                                    <th>{info.label}</th>
                                    <td>{info.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div> 
    );
};

export default ViewDetail;