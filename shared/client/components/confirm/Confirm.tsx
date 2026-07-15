'use client';
import React from 'react';
import Button from '../button/Button';
import '@/shared/client/styled/modal/modal.css';
import CancelButton from '../button/CancelButton';
import { usePathname, useRouter } from 'next/navigation';

interface ConfilmProps {
    confilmShow: boolean;
    setConfilmShow: React.Dispatch<React.SetStateAction<boolean>>;
    confilmText: string;
    setConfilmText: React.Dispatch<React.SetStateAction<string>>;
};

const Confirm = ({confilmShow, setConfilmShow, confilmText, setConfilmText}:ConfilmProps) => {
    const pathName = usePathname();
    const router = useRouter();

    const confilmOk = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(confilmShow) {
            setConfilmShow(false);
            setConfilmText('');
        };

        if(pathName.includes('/payment')) {
            router.back();
        }
    }; 

    const confilmCancel = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(confilmShow) {
            setConfilmShow(false);
            setConfilmText('');
        };
    };

    return (
        <div className='modal-container'>
            <div className='modal-item'>
                <div className='modal-info'>
                    <p className='text-body'>{confilmText}</p>
                </div>
                <div className='modal-btns'>
                    <Button 
                        buttonText='네'
                        onClick={confilmOk}
                    />
                    <CancelButton 
                        buttonText='아니오'
                        onClick={confilmCancel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Confirm;