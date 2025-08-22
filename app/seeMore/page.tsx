import React from 'react';
import LoginSection from '@/features/seeMore/components/LoginSection';
import MoreLists from '@/features/seeMore/components/MoreLists';
import seeMoreStyles from '@/features/seeMore/seeMore.module.css';

const SeeMorePage = () => {
    return (
        <main>
            <section className={seeMoreStyles.login_section}>
                <div className='inner'>
                    <LoginSection />
                </div> {/* inner */}
            </section>
            <section>
                <MoreLists />
            </section>
        </main>
    );
};

export default SeeMorePage;