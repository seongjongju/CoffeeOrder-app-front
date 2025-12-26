'use client';
import '@/shared/styled/authStyle/authStyle.css';
import '@/shared/styled/policyStyle/policyStyle.css';
import usePolicyChecked from '@/features/policy/hook/usePolicyChecked';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/button/Button';
import Modal from '@/shared/components/modal/Modal';
import useModalShow from '@/shared/components/modal/hook/useModalShow';
import AppBar from '@/shared/components/appbar/AppBar';

const PolicyPage = () => {
    const {checkedState, checkedFunction} = usePolicyChecked();
    const {modalShow, setModalShow, modalText, setModalText} = useModalShow();
    const router = useRouter();

    const nextMoveClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(checkedState.isAllChecked === false) {
            setModalText('약관에 동의해주세요.')
            setModalShow(true);
        } else {
            return router.push('/signUp');
        }
    };

    return (
        <main className='main'>
            <div className='inner'>
                <h2 className='title'>약관에 동의해주세요.</h2>
                <form>
                    <div className='all-checked-container'>
                        <label className='label'>
                            <div className='all-checked-custom'>
                                <input
                                    className='checked-input' 
                                    type='checkbox'
                                    checked={checkedState.isAllChecked}
                                    onChange={() => checkedFunction.allCheck()}
                                />
                                <span className='checked-show-hide'></span>
                            </div>
                            모두 동의하기
                        </label>
                    </div>

                    <div className='checked-container'>
                        <label className='label'>
                            <div className='checked-custom'>
                                <input
                                    className='checked-input' 
                                    type='checkbox'
                                    checked={checkedState.isPolicyChecked}
                                    onChange={() => checkedFunction.policyCheck()}
                                />
                                <span className='checked-show-hide'></span>
                            </div>
                            약관동의 <span style={{ color: "#FF4040" }}>*</span>
                        </label>
                        <div className='policy-info'>
                            <p className='policy-heading'>1. 이용약관</p>
                            <p className='policy-text'>
                                약관내용 약관내용 약관내용 약관내용 약관내용 약관내용 약관내용
                            </p>
                        </div>
                    </div>

                    <div className='checked-container'>
                        <label className='label'>
                            <div className='checked-custom'>
                                <input 
                                    className='checked-input'
                                    type='checkbox'
                                    checked={checkedState.isPrivacyChecked}
                                    onChange={() => checkedFunction.privacyCheck()}
                                />
                                <span className='checked-show-hide'></span>
                            </div>
                            개인정보처리방침 <span style={{ color: "#FF4040" }}>*</span>
                        </label>
                        <div className='policy-info'>
                            <p className='policy-heading'>1. 개인정보처리방침</p>
                            <p className='policy-text'>
                                약관내용 약관내용 약관내용 약관내용 약관내용 약관내용 약관내용
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            <div className='next-button-container'>
                <Button 
                    buttonText='다음으로'
                    onClick={nextMoveClick}
                />
            </div>

            {
                modalShow && 
                <Modal 
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    modalText={modalText}
                    setModalText={setModalText}
                />
            }
        </main>
    );
};

export default PolicyPage;