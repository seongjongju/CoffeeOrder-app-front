import '@/app/client/view/_styled/view.css';
import '@/shared/client/styled/policyStyle/policyStyle.css';
import ViewLayout from '../../_components/ViewLayout';

const ViewPage = () => {    
    return (
        <main className='main' style={{ paddingBottom: "0" }}>
            <ViewLayout />
        </main>
    );
};

export default ViewPage;