import '@/shared/styled/authStyle/authStyle.css';
import '@/shared/styled/policyStyle/policyStyle.css';
import PolicyForm from './_components/PolicyForm';

const PolicyPage = () => {
    return (
        <main className='main auth-main'>
            <div className='inner'>
                <h2 className='title'>약관에 동의해주세요.</h2>
                <PolicyForm />
            </div>
        </main>
    );
};

export default PolicyPage;