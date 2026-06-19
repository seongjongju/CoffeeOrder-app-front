import React, { Suspense } from 'react';
import '../_styled/view.css';
import '../../auth/_styled/policyStyle.css';
import VIewInterface from '../_components/VIewInterface';
import LoadingUi from '@/shared/client/components/loading/LoadingUi';

const Viewpage = async ({ params }: {params : Promise<{ prd: string; }>}) => {
    const {prd} = await params;

    return (
        <main 
            className='main' 
            style={{ paddingBottom: "0" }}
        >
            <Suspense fallback={<LoadingUi />}>
                <VIewInterface 
                    prdParams={prd}
                />
            </Suspense>
        </main>
    );
};

export default Viewpage;