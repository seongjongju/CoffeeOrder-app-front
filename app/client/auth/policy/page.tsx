import '../_styled/authStyle.css';
import '../_styled/policyStyle.css';
import PolicyForm from './_components/PolicyForm';

const PolicyPage = () => {
    return (
        <main className='main'>
            <div className='inner'>
                <h2 className='title'>약관에 동의해주세요.</h2>
                <PolicyForm />
            </div>
        </main>
    );
};

export default PolicyPage;