import React from 'react';
import "./_styled/admin_login.css";

const AdminLoginPage = () => {
    return (
        <main className='admin-main'>
            <form action="" className='admin-login'>
                <h1 className='admin-login__title'>Admin</h1>
                <input type="text" placeholder='아이디 입력' className='admin-login__input'/>
                <input type="password" placeholder='비밀번호 입력' className='admin-login__input'/>

                <button className='admin-login__button'>로그인</button>
            </form>
        </main>
    );
};

export default AdminLoginPage;