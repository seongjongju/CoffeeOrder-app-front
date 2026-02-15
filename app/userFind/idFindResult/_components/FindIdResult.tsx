'use client';
import Button from '@/shared/components/button/Button';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const FindIdResult = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const router = useRouter();

    return (
        <div>
            <div 
                style={
                    {
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: '700',
                        marginTop: '20px',
                    }
                }
            >
                {userId ? userId : '아이디를 찾을 수 없습니다.'}
            </div>
            <div
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginTop: '15px',
                    }
                }
            >
                <Button 
                    buttonText='로그인 하러 가기'
                    onClick={() => router.push('/login')}
                />
                <Button 
                    buttonText='비밀번호 재설정'
                    onClick={() => router.push('/userFind/passwordFind')}
                />
            </div>    
        </div>
    );
};

export default FindIdResult;