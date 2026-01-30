import '@/shared/styled/authStyle/authStyle.css';
import PasswordFindForm from './_components/PasswordFindForm';

const PasswordFindPage = () => {
    return (
        <main className='main auth-main'>
            <div className='inner'>
                <PasswordFindForm />
            </div>
        </main>
    );
};

export default PasswordFindPage;