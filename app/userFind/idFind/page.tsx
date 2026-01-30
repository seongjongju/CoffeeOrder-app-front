import '@/shared/styled/authStyle/authStyle.css';
import IdFindForm from "./_components/IdFindForm";

const IdFindPage = () => {
    return (
        <main className='main auth-main'>
            <div className='inner'>
                <IdFindForm />
            </div> 
        </main>
    );
};

export default IdFindPage;