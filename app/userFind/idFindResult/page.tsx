'use client';
import { AuthContainer, AuthText, AuthTop } from '@/features/styled/authStyled';
import { Inner } from '@/shared/styled/GlobalStyled';
import Image from 'next/image';
import mascot from '@/shared/assets/images/contents/mascot.png';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/shared/components/Button';

const IdFindResultPage = () => {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const router = useRouter();

    return (
        <>
            <Inner>
                <div>
                    <AuthTop>
                        <Image src={mascot} alt='마스코트' />
                        <AuthText>
                            회원님의 정보와 일치하는 <br />
                            아이디를 찾았어요!!
                        </AuthText>
                    </AuthTop>
                    <div 
                        style={
                            {
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                height: '100px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '20px',
                                fontWeight: '700',
                                marginTop: '20px',
                            }
                        }
                    >
                        {userId ? userId : '아이디를 찾을 수 없습니다.'}
                    </div>
                    <div
                        style={
                            {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginTop: '15px',
                            }
                        }
                    >
                        <Button 
                            buttonText='로그인 하러 가기'
                            onClick={() => router.push('/login')}
                        />
                        <Button 
                            buttonText='비밀번호 찾기'
                            onClick={() => router.push('/userFind/passwordFind')}
                        />
                    </div>    
                </div>
            </Inner> 
        </>
    );
};

export default IdFindResultPage;