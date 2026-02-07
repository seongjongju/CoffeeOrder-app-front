import '@/shared/styled/authStyle/authStyle.css';
import LoginForm from './_components/LoginForm';

const LoginPage = () => {
    return (
        <main className='main auth-main'>
            <div className='inner'>
                <LoginForm />
            </div> 
        </main>
    );
};

export default LoginPage;