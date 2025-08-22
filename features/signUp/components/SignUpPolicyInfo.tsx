import React from 'react';
import styles from '../signUp.module.css';

const SignUpPolicyInfo = () => {
    return (
        <div className={styles.signup_policy}>
            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제1조 (목적)</p>
                <p className={styles.signup_text}>
                    이 약관은 [서비스명] (이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제2조 (정의)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            "서비스"라 함은 회사가 제공하는 [공동구매, 주문, 결제 등] 관련 기능을 의미합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            "회원"이라 함은 본 약관에 동의하고 회사와 이용계약을 체결하여 서비스를 이용하는 자를 말합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>3.</span>
                        <p className={styles.signup_text}>
                            "비회원"이라 함은 회원에 가입하지 않고 서비스를 이용하는 자를 말합니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제3조 (약관의 효력 및 변경)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            본 약관은 회원이 이에 동의함으로써 효력이 발생합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회사는 필요 시 관련 법령을 위배하지 않는 범위 내에서 약관을 개정할 수 있습니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>3.</span>
                        <p className={styles.signup_text}>
                            변경된 약관은 공지사항을 통해 고지하며, 고지 후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 간주합니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제4조 (회원가입 및 계정 관리)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회원가입은 회원이 본 약관에 동의하고 회사가 정한 절차에 따라 가입 신청을 완료함으로써 성립합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회원은 가입 시 본인의 정보를 정확히 기재해야 하며, 허위 정보를 기재할 경우 서비스 이용에 제한을 받을 수 있습니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>3.</span>
                        <p className={styles.signup_text}>
                            회원은 자신의 계정(ID, 비밀번호)을 관리할 책임이 있으며, 이를 제3자에게 양도 또는 대여할 수 없습니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제5조 (서비스의 제공 및 변경)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회사는 회원에게 [상품 주문, 공동구매, 결제, 배송 조회 등] 서비스를 제공합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회사는 서비스의 일부 또는 전부를 변경·중단할 수 있으며, 이 경우 사전에 공지합니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제6조 (결제 및 환불)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회원은 회사가 정한 방법으로 상품 또는 서비스를 결제할 수 있습니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            결제 취소 및 환불은 관련 법령 및 회사의 환불정책에 따릅니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제7조 (회원의 의무)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회원은 타인의 개인정보를 도용해서는 안 됩니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회원은 회사의 서비스 운영을 방해하는 행위를 해서는 안 됩니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>3.</span>
                        <p className={styles.signup_text}>
                            회원은 법령 또는 공서양속에 위반되는 행위를 해서는 안 됩니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제8조 (회사의 의무)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회사는 관련 법령과 본 약관이 정하는 바에 따라 지속적이고 안정적인 서비스를 제공합니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회사는 회원의 개인정보를 보호하기 위해 노력하며, 개인정보 처리방침을 따릅니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제9조 (계약 해지 및 이용 제한)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회원은 언제든지 회원 탈퇴를 신청할 수 있습니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회사는 회원이 약관을 위반할 경우 서비스 이용을 제한하거나 회원 자격을 박탈할 수 있습니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제10조 (면책조항)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            회사는 천재지변, 기술적 문제 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                        </p>
                    </li>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>2.</span>
                        <p className={styles.signup_text}>
                            회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.
                        </p>
                    </li>
                </ul>
            </div> {/* signup_info */}

            <div className={styles.signup_info}>
                <p className={styles.signup_heading}>제11조 (준거법 및 관할법원)</p>
                <ul className={styles.signup_list}>
                    <li className={styles.signup_list_text}>
                        <span className={styles.signup_number}>1.</span>
                        <p className={styles.signup_text}>
                            본 약관은 대한민국 법률을 준거법으로 하며, 분쟁이 발생할 경우 회사 본사 소재지의 관할 법원을 제1심 법원으로 합니다.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SignUpPolicyInfo;