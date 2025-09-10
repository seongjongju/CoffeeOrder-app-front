'use client';
import {Inner, Title, CommonLabel, errColor, NextButtonContainer} from '@/shared/styled/GlobalStyled';
import {
    PolicyForm, 
    AllCheckedContainer, 
    CheckedInput, 
    AllCheckedCustom, 
    CheckedShowHide,
    CheckedContainer,
    CheckedCustom,
    PolicyInfo,
    PolicyHeading,
    Policytext
} from '@/features/styled/policyStyled';
import usePolicyChecked from '@/features/policy/hook/usePolicyChecked';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/Button';
import Modal from '@/shared/components/Modal';
import useModalShow from '@/shared/hook/useModalShow';

const PolicyPage = () => {
    const {checkedState, checkedFunction} = usePolicyChecked();
    const {modalShow, setModalShow} = useModalShow();
    const router = useRouter();

    const nextMoveClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(checkedState.isAllChecked === false) {
            setModalShow(true);
        } else {
            return router.push('/signUp');
        }
    };

    return (
        <>
            <Inner>
                <Title>약관에 동의해주세요.</Title>
                <PolicyForm>
                    <AllCheckedContainer>
                        <CommonLabel>
                            <AllCheckedCustom>
                                <CheckedInput 
                                    type='checkbox'
                                    checked={checkedState.isAllChecked}
                                    onChange={() => checkedFunction.allCheck()}
                                />
                                <CheckedShowHide />
                            </AllCheckedCustom>
                            모두 동의하기
                        </CommonLabel>
                    </AllCheckedContainer>

                    <CheckedContainer>
                        <CommonLabel>
                            <CheckedCustom>
                                <CheckedInput 
                                    type='checkbox'
                                    checked={checkedState.isPolicyChecked}
                                    onChange={() => checkedFunction.policyCheck()}
                                />
                                <CheckedShowHide />
                            </CheckedCustom>
                            약관동의 <span style={{ color: errColor }}>*</span>
                        </CommonLabel>
                        <PolicyInfo>
                            <PolicyHeading>1. 이용약관</PolicyHeading>
                            <Policytext>
                                약관내용 약관내용 약관내용 약관내용 약관내용 약관내용 약관내용
                            </Policytext>
                        </PolicyInfo>
                    </CheckedContainer>

                    <CheckedContainer>
                        <CommonLabel>
                            <CheckedCustom>
                                <CheckedInput 
                                    type='checkbox'
                                    checked={checkedState.isPrivacyChecked}
                                    onChange={() => checkedFunction.privacyCheck()}
                                />
                                <CheckedShowHide />
                            </CheckedCustom>
                            개인정보처리방침 <span style={{ color: errColor }}>*</span>
                        </CommonLabel>
                        <PolicyInfo>
                            <PolicyHeading>1. 개인정보처리방침</PolicyHeading>
                            <Policytext>
                                약관내용 약관내용 약관내용 약관내용 약관내용 약관내용 약관내용
                            </Policytext>
                        </PolicyInfo>
                    </CheckedContainer>
                </PolicyForm>
            </Inner>

            <NextButtonContainer>
                <Button 
                    buttonText='다음으로'
                    onClick={nextMoveClick}
                />
            </NextButtonContainer>

            {
                modalShow && 
                <Modal 
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    modalText='약관에 동의해주세요.'
                />
            }
        </>
    );
};

export default PolicyPage;