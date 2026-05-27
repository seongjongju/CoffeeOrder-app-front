import '../_styled/authStyle.css';
import SignUpForm from "./_components/SignUpForm";

const SignUpPage = () => {
    return (
        <main className='main'>
            <section className='section'>
                <div className='inner'>
                    <SignUpForm />
                </div>
            </section>
        </main>
    );
};

export default SignUpPage;