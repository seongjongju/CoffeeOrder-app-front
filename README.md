# ☕️ CoffeeOrder (Frontend)

커피 주문 및 결제 시스템의 사용자 인터페이스를 담당하는 프론트엔드 프로젝트입니다.

## 🛠 Tech Stack
- Framework : Next.js 
- Language : TypeScript
- Data Fetching : Axios
- Progressive Web App : Next-PWA
- State Management : ReduxToolkit  
- Styling : CSS
- Deployment : Vercel
- Payment : NICE PAY

## 🌟 Key Features
- Progressive Web App Design : PC와 모바일 환경에 최적화된 UI 제공.
- Global State Management : 유저 인증 상태, 장바구니, 주문내역을 효율적으로 관리.
- Payment Integration : NICE PAY API를 통한 실시간 간편 결제 연동.
- Order Tracking : 주문 내역을 실시간 확인.
- BEM (Block Element Modifier) : 유지보수와 가독성을 위해 BEM 설계 방식을 도입하여 클래스 구조를 체계화했습니다.

## 🚀 Getting Started
### 1. 의존성 설치
- npm install

### 2. 환경 변수 설정 (.env)
루트 폴더에 `.env` 파일을 생성하고 아래 항목을 입력하세요.

# API주소 환경변수
NEXT_PUBLIC_API_URL=백엔드 주소
NEXT_PUBLIC_FRONT_API_URL=프론트엔드 주소

# 결제
NEXT_PUBLIC_NICEPAY_CLIENT_ID=NICE PAY 클라이언트 KEY 값
NEXT_PUBLIC_NICEPAY_SECRET_KEY=NICE PAY 시크릿 KEY 값

### 3. 실행
- npm run dev

### 🏹 Trouble Shooting
모바일 리다이렉트 시 로그인 유지 (withCredentials)
[Problem]
- 모바일 결제 완료 후 백엔드로 검증 요청을 보낼 때, 브라우저에 저장된 인증 쿠키가 함께 전송되지 않아 권한 오류 발생.

[Solution]
- Axios 인스턴스 설정 시 withCredentials: true를 기본값으로 설정하여, 크로스 도메인 환경에서도 쿠키가 안전하게 공유되도록 처리.
- 백엔드 배포 주소(HTTPS)와 통신 시 보안 정책을 준수하도록 구성.


