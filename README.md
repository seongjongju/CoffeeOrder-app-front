# CoffeeOrderApp (커피 주문 웹앱)

Next.js App Router와 API Routes 기반의 모바일 커피 주문 및 관리자 전용 웹 애플리케이션입니다.  
모바일 환경에서 앱처럼 편리하게 커피를 주문하고 결제할 수 있는 PWA 기반 웹 서비스로 기획했습니다.  
실제 나이스페이 결제 및 웹훅 연동, MongoDB를 활용한 주문·재고 관리, 데이터 처리 과정에서의 레이스 조건 방지 등 실무적인 동작 프로세스를 고려하여 구현했습니다.

* 서비스 URL: https://jongju-coffee-order-app.vercel.app/
* 관리자 페이지 URL: https://jongju-coffee-order-app.vercel.app/admin/admin_login
* GitHub 저장소: https://github.com/seongjongju/CoffeeOrder-app

---

## 기술 스택

### 프론트엔드
- Framework / Library: Next.js (App Router), React, TypeScript
- 상태 관리: Redux Toolkit
- 데이터 통신: React Query, Axios
- 스타일링: CSS

### 백엔드 및 인프라
- 데이터베이스 / API: MongoDB, Next.js API Routes
- 배포 및 이미지: Vercel, Cloudinary
- 인증 및 유틸리티: JWT (Access/Refresh Token), Nodemailer
- 결제 및 PWA: 나이스페이 연동 (웹훅 포함), 서비스 워커 (PWA)

---

## 주요 기능

### 사용자 서비스
* 메인 / 상품 목록: 카테고리 탭 메뉴, 디바운스를 적용한 상품 실시간 검색
* 장바구니: 상품 수량 변경, 옵션 및 총 가격 실시간 연산, 결제 페이지 연동
* 주문 및 결제: 테스트 결제 API 및 웹훅 연동, 단일/장바구니 주문 흐름 분기
* 주문 내역: 이전 주문 목록 조회 및 동적 라우팅 기반의 상세 페이지 제공
* 사용자 인증: JWT 기반 토큰 로그인/Nodemailer를 활용한 회원가입, 아이디 찾기/비밀번호 변경, 미인증 사용자 리디렉션 처리
* 모바일 사용자 경험 지원: 홈 화면 추가(A2HS), 데이터 전송 시 중복 요청을 방지하는 로딩 처리

### 관리자 서비스
* 대시보드: Chart.js를 활용한 매출 및 주문 데이터 시각화
* 관리자 인증: JWT 기반 전용 토큰 인증 및 미인증 관리자 접근 제한
* 재고 및 상품 관리: 상품 등록, 수정, 체크박스 다중 선택을 통한 일괄 삭제
* 데이터 필터링: 카테고리별 필터, 키워드 검색, 날짜 범위 검색

---

## 핵심 기술적 의도 및 데이터 구조 고민

1. 프론트엔드 중심의 Full-Stack 아키텍처 (Next.js API Routes + MongoDB)
초기에는 로컬 스토리지와 정적 JSON 데이터로 기획했으나, 주문 및 재고 상태 관리의 영구적 보존 필요성을 느껴 DB를 도입했습니다. 별도의 백엔드 서버를 추가 구축하는 대신 프론트엔드 환경과 연속성을 유지할 수 있는 Next.js API Routes와 유연한 Document 구조를 지원하는 MongoDB를 선택했습니다.

2. 단일 주문과 장바구니 결제 흐름의 명확한 분기
주문서 생성 시 쿼리 스트링으로 orderType을 전달하도록 설계했습니다. Next.js API Routes에서 searchParams를 읽어 orderType이 장바구니 주문인 경우에만 결제 완료 후 장바구니 비우기 로직이 실행되도록 결제 비즈니스 로직을 명확히 구분했습니다.

3. 체크박스 기반의 일괄 삭제 API 설계
관리자 페이지에서 재고 및 상품을 효율적으로 처리하기 위해 체크박스 선택 시 대상 ID들을 배열로 수집합니다. 해당 배열을 API Route로 전송하여 DB 단에서 일괄 삭제 query를 실행하도록 구현했습니다.

---

## 개발 과정에서 해결한 문제 (트러블슈팅)

1. 장바구니 수량 변경 중 결제 시 가격 불일치
- 문제 상황: 사용자가 장바구니에서 수량을 변경하는 순간 데이터가 서버로 전송되는 짧은 시간 동안 [결제하기] 버튼을 누를 수 있었습니다. 이 경우 서버 연산이 반영되기 전의 기존 수량과 가격으로 주문서가 생성되는 현상이 발생했습니다.
- 원인: 수량 변경 비동기 요청 완료 타이밍과 결제 페이지 이동 요청 간의 동기화가 이루어지지 않았습니다.
- 해결 방법: 장바구니 수량을 조절할 때 비동기 처리 기간 동안 [결제하기] 버튼을 로딩 상태로 전환하여 사용자 클릭을 차단했습니다. 수량 변경 요청이 완전히 성공한 뒤에만 결제 단계로 진입할 수 있도록 UI 흐름을 제한했습니다.

2. 네트워크 및 사용자 이탈 대응을 위한 웹훅 연동
- 문제 상황: 클라이언트 사이드 승인 방식에만 의존할 경우, 사용자가 결제 도중 브라우저를 닫거나 결제 승인 후 네트워크 문제로 리디렉션 페이지에 도착하지 못하면 결제 내역 누락 및 이중 차금 등의 위험이 있었습니다.
- 원인: 클라이언트 환경의 불안정성에 의존적인 주문 승인 구조가 원인이었습니다.
- 해결 방법: PG사(나이스페이)와 서버 대 서버로 직접 통신하는 웹훅 서버를 구축했습니다. 클라이언트 연결이 끊기더라도 PG사로부터 전달받은 결제 승인 이벤트를 백엔드에서 수신하여 주문 데이터의 안정성과 데이터 일관성을 보장했습니다.

3. 배포 환경에서 결제 성공 후 리디렉션 실패 문제
- 문제 상황: Vercel에 배포한 후 결제 성공 시 클라이언트 리디렉션이 동작하지 않고 요청이 대기 상태에 머무는 문제가 발생했습니다.
- 원인: API Route에서 기본 NextResponse.redirect 처리 시, 일부 POST 기반 응답 처리나 PG사 콜백 흐름에서 HTTP 상태 코드가 적절하게 매핑되지 않았던 현상이었습니다.
- 해결 방법: NextResponse.redirect 호출 시 HTTP 303(See Other) 상태 코드를 명시적으로 전달하여 POST 처리 이후 GET 요청으로 올바르게 리디렉션되도록 수정했습니다.

---

## 회고 및 향후 개선 과제

아쉬운 점 및 배운 점
- TypeScript 재사용성: 프로젝트 초반 컴포넌트별로 interface를 각각 정의하다 보니 중복 코드가 늘어났습니다. 개발을 진행하며 공통 타입은 별도 파일로 분리해 export하여 재사용하도록 다듬었으나, 처음부터 데이터 구조를 긴밀하게 추상화하지 못한 아쉬움이 남아 타입 설계의 중요성을 깨달았습니다.

개선 및 확장 예정 사항
- 장바구니 퍼스널 옵션 확장: 현재는 상품 단위로 등록되어 있으나, 추후 동일 상품에 대해 샷 추가, 연하게 등 복잡한 퍼스널 옵션 배열을 수용할 수 있도록 옵션 선택 구조 및 장바구니 데이터 폼을 고도화할 계획입니다.
- 쿠폰 및 리워드 시스템 연동: 사용자 재방문율과 이탈 방지를 위해 구매 건수별 스탬프 적립, 할인 쿠폰 발급 및 결제 시 쿠폰 적용이 가능하도록 데이터 모델과 결제 로직을 확장할 예정입니다.

---

## 로컬 실행 방법

### 1. 프로젝트 클론 및 패키지 설치
```bash
git clone [https://github.com/seongjongju/CoffeeOrder-app.git](https://github.com/seongjongju/CoffeeOrder-app.git)
cd CoffeeOrder-app
npm install

* 프로젝트 루트 경로에 .env 파일을 생성하고 아래 형식에 맞추어 키값을 설정합니다.
# URL
NEXT_PUBLIC_FRONT_API_URL=http://localhost:3000

# DB
DB_PORT=4000
DB_NAME=coffeeOrderDB
MONGO_URI=your_mongo_uri

# JWT
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ADMIN_ACCESS_SECRET=your_jwt_admin_access_secret
JWT_ADMIN_REFRESH_SECRET=your_jwt_admin_refresh_secret

# mail
GMAIL_USER=your_gmail_account
GMAIL_APP_PASSWORD=your_gmail_app_password

# 나이스페이먼츠
NEXT_PUBLIC_NICEPAY_SECRET_KEY=your_nicepay_secret_key
NEXT_PUBLIC_NICEPAY_CLIENT_ID=your_nicepay_client_id
NEXT_PUBLIC_NICEPAY_URL=your_nicepay_url

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 개발환경
NODE_ENV=development
NODE_SAME=none

* 개발 서버 실행
npm run dev
