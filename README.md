
## 프로젝트 실행

```bash
$ docker-compose up --build
```


## Api 명세

기본 url
-http://localhost:4000

회원가입 - @Post('/auth/register') 
- 설명: 유저 등록
- 요청 body: {"email" : "example@gmail.com" , "password": "password", "name": "홍길동", "role": "역할(ADMIN,USER,OPERATOR,AUDITOR)"}

로그인 - @Post('/auth/login')
- 설명: 로그인
- 요청 body: {"email" : "example@gmail.com" , "password": "password"}
- 응답예시: {"access_token": { "access_token" : "token code" } }

이벤트 등록 - @Post('/event/register')
- 설명: 이벤트 등록
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"name": "여름 방학 이벤트", "description": "여름 방학 맞이 출석 이벤트", "status": false, 
              "startDate": "2025-06-30T12:00:00.000Z", "endDate": "2025-09-01T12:00:00.000Z"}

이벤트 조건 등록 - @Post('/event/condition')
- 설명: 이벤트 보상 조건 등록
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body : { "eventId": "_id", "type": "출석", "goal": 3, "description": "출석 3일"}

이벤트 보상 등록 - @Post('/event/gameItem'), @Post('/event/coin'), @Post('/event/EnhancementBook')
- 설명: 이벤트 보상 등록( 보상 종류별로 엔드포인트를 나눠 놓았습니다 )
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"eventId": "_id", "name": "파워엘릭서", "quantity": 200}

이벤트 활성화/비활성화 - @Put('/event/eventStatus')
- 설명: 이벤트 상태변경
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"eventId": "_id"}

이벤트 목록 조회 - @Get('/event/eventList')
- 설명: 이벤트 목록 조회
- 토큰 필요: "Authorization: Bearer Token"
- 응답예시: [ { "id": "event_id", "name": "여름 방학 이벤트" }, { "id": "event_id", "name": "22주년 이벤트" } ]

이벤트 상세 조회 - @Get('/event/eventDetail')
- 설명: 이벤트 상세 조회
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: { "eventId": "_id" }
- 응답예시: { "_id": "event_id", "name": "여름 방학 이벤트", "description": "여름 방학 맞이 출석 이벤트", "status": true, 
              "reward": ["reward_id"], "condition": "condition_id", "startDate": "2025-06-30T12:00:00.000Z", "endDate": "2025-09-01T12:00:00.000Z"}

이벤트 조건 조회 - @Get('/event/conditionCheck')
- 설명: 이벤트 조건 조회
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: { "conditionId": "_id" }
- 응답 예시: {"_id": "condition_id", "eventId": "event_id", "type": "출석", "goal": 3, "description": "출석 3일"}

이벤트 보상 목록 조회 - @Get('/event/rewardList')
- 설명: 이벤트 보상 목록 조회
- 토큰 필요: "Authorization: Bearer Token"
- 응답예시: [ { "id": "reward_id", "name": "파워엘릭서서" }, { "id": "reward_id", "name": "강화 주문서" } ]

이벤트 보상 상세 조회 - @Get('/event/rewardCheck')
- 설명: 이벤트 조건 조회
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: { "rewardId": "_id" }
- 응답예시: {"eventId": "_id", "type" : "game_item", "name": "파워엘릭서", "quantity": 200}

이벤트 조건 진행 - @Put('/auth/progress')
- 설명: 이벤트 조건을 실행
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"eventId" : "_id", "userId": "_id", "conditionId": "_id"}

이벤트 보상 요청 등록 - @Post('/event/rewardRequest')
- 설명: 보상 요청 등록
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"eventId" : "_id", "userId": "_id"}

이벤트 보상 요청 목록 조회 - @Get('/event/requestList') 
- 설명: 보상 요청 목록 조회
- 토큰 필요: "Authorization: Bearer Token"
- 응답예시: [ {"_id": "request_id", "userId": "_id", "eventId": "_id", "status": false} , {"_id": "request_id", "userId": "_id", "eventId": "_id", "status": true} ]

유저별 이벤트 보상 요청 조회 - @Get('/event/CheckRequest')
- 설명: 보상 요청 목록 조회
- 토큰 필요: "Authorization: Bearer Token"
- 요청 body: {"userId": "_id"}
- 응답예시: [ {"_id": "request_id", "userId": "_id", "eventId": "_id", "status": false} , {"_id": "request_id", "userId": "_id", "eventId": "_id", "status": true} ]


## 이벤트 설계 이유
저의 이벤트 API 설계는 다음과 같은 순서로 이루어져 있습니다
```
️이벤트 기본 정보 등록 (이름, 내용, 상태: false)  -> 이벤트 보상 조건 및 보상 정보 등 , 이벤트 보상 등록 -> 이벤트 상태 전환 API를 통한 활성  
```
이벤트 보상 조건을 체계적으로 관리하기 위해 **"조건 스키마"**를 별도로 설계하였습니다.
조건 스키마에는 type과 횟수를 정의하여, 다양한 이벤트(출석, 퀘스트 등)의 조건을 유연하게 처리할 수 있도록 하였습니다.
이 구조를 통해 이벤트의 기본 정보와 조건을 분리함으로써, 이벤트 생성과 조건 설정을 명확하게 구분할 수 있었습니다.
이와 같은 설계 방식을 따르다 보니, 보상 정보 역시 동일한 구조로 설계하게 되었으며,
이벤트가 활성화된 이후 조건 충족 여부에 따라 보상이 지급될 수 있도록 설계하였습니다.

## 조건 검증 방법
이벤트 보상 조건을 만족하기 위해서는 유저의 활동(퀘스트 수행, 출석 체크 등)을 반영할 필요가 있었습니다.
이를 위해 이벤트 조건 진행 API를 추가로 설계하였으며, 동작 과정은 다음과 같습니다.

1️.이벤트 조건 진행 API를 처음 실행 시:  
   - 해당 이벤트를 '수락' 처리하고, 유저의 조건 진행 상태를 0으로 초기화  

2.이후 이벤트 조건 진행 API 호출 시:  
   - 유저의 조건 횟수를 증가시키며, 목표 횟수와 비교  

3.이벤트 보상 요청 시:  
   - 누적된 조건 횟수를 기준으로 성공 또는 실패를 판단

이 설계 방식은 조건 진행 상태를 명확히 관리하고, 보상 지급 시 user스키마의 successRequests[]에 보상을 받은 eventId를 넣으므로써 중복 요청을 방지하며,
조건 달성 여부를 명확하게 판단할 수 있도록 하였습니다.

## 추가로 고민한 점: ID 관리 방식
이벤트와 보상 조건을 설계하면서, 스키마 내에 MongoDB의 고유 _id 값들이 많이 포함되어 있습니다.
처음에는 보기 편하게 **이름(name)**으로 참조할지 고민했지만, 몇 가지 이유로 인해 결국 _id를 사용하기로 결정하였습니다.

고민했던 이유:
- name 값으로 참조하면 사람이 읽기에는 편리하나, 중복된 이름이 존재할 수 있는 위험성이 있습니다.
- 특히 같은 이름의 이벤트나 보상이 여러 개 등록될 경우, 정확한 참조가 어려워질 수 있습니다.

결정 이유:
- MongoDB의 _id 값은 절대 중복되지 않는 고유값으로, 데이터 참조 시 명확하고 정확한 식별이 가능합니다.
- 또한, MongoDB는 _id로 인덱싱이 되어 있기 때문에, 조회 시 성능 최적화도 가능합니다.
- 이러한 이유로, 가독성보다는 정확성과 일관성을 우선시하여 _id를 참조하도록 설계하였습니다.


