'use client';
import { adminLoginApi } from '@/features/adminApi/adminAuthApi';
import useLoading from '@/features/hooks/loading/useLoading';
import AdminLoadingUI from '@/shared/admin/components/loading/AdminLoadingUI';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AdminLoginForm = () => {
    const {isLoading, setIsLoading} = useLoading();
    const [adminIdInput, setAdminIdInput] = useState<string>('');
    const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();

    //리다이렉트 처리
    useEffect(() => {
        const error = searchParams.get('error');
        if(error === "token_expired") {
            alert('로그인이 필요합니다.');
            router.replace('/admin/admin_login');
            return;
        } 
    }, []);

    const handleClickLoginSubmit = async () => {
        if(adminIdInput.trim() === "") {
            alert('아이디를 입력하세요.');
            return;
        }

        if(adminPasswordInput.trim() === "") {
            alert('패스워드를 입력하세요.');
            return;
        }

        try {
            setIsLoading(true);

            const data = await adminLoginApi(adminIdInput, adminPasswordInput);
            if(!data.success) {
                alert(`${data.message}`);
                return;
            }

            router.push('/admin/admin_main');
        } catch(err: any) {
            console.error(err.message);
            alert(`${err.response.data.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className='admin-main'>
            <form action="" className='admin-login'>
                <h1 className='admin-login__title'>Admin</h1>
                <input 
                    type="text"
                    placeholder='아이디 입력'
                    className='admin-login__input'
                    value={adminIdInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAdminIdInput(e.target.value);
                    }}
                />
                <input 
                    type="password" 
                    placeholder='비밀번호 입력' 
                    className='admin-login__input'
                    value={adminPasswordInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAdminPasswordInput(e.target.value);
                    }}
                />

                <button 
                    className='admin-login__button'
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        handleClickLoginSubmit();
                    }}
                >
                    로그인
                </button>
            </form>

            {
                isLoading &&
                (
                    <AdminLoadingUI 
                        isLoading={isLoading}
                    />
                ) 
            }
        </main>
    );
};

export default AdminLoginForm;