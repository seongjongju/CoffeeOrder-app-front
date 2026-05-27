import '../../auth/_styled/authStyle.css';
import PasswordFindForm from './_components/PasswordFindForm';

const PasswordFindPage = () => {
    return (
        <main className='main'>
            <div className='inner'>
                <PasswordFindForm />
            </div>
        </main>
    );
};

export default PasswordFindPage;