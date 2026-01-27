import '@/shared/styled/authStyle/authStyle.css';
import SignUpForm from './_components/SignUpForm';

const SignUpPage = () => {
    return (
        <main className='main' style={{paddingTop: 0 }}>
            <section className='section'>
                <div className='inner'>
                    <SignUpForm />
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;