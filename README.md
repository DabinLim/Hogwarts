# 호그와트 개인 미니 프로젝트


> ### 호그와트에 입학 하신 당신을 환영합니다.


## [결과물 시연 영상](https://www.youtube.com/watch?v=o6K4TEEsC04)


## 개인 프로젝트

- **임다빈** : Front-end, Back-end
  - `React.js`
  - `Node.js - express`


## Environment

- **React.js**
- **React-redux**
- **Node.js**
- **MongoDB**
- **JavaScript**
- **JWT**
- **redux-toolkit**
- **socket io**




## Description

- 웹 개발을 시작할때부터 한번쯤 만들어보고 싶었던 해리포터 주제의 웹사이트이다.<br>진행중이던 팀 프로젝트 + 내일부터 새로 시작되는 실전 프로젝트로 인해 많은 부분을 스펙아웃, 완성에 초점을 뒀다.<br> 추후에 시간이 생기면 이어서 진행 할 예정이다.<br>





### 1. 로그인, 회원가입 페이지

 - 상태관리를 활용한 실시간 유효성 검사
 - 서버에서 데이터베이스 확인 후 중복된 아이디 또는 닉네임의 경우 401 status 에러 전송

 <img src="https://user-images.githubusercontent.com/77574867/115729683-96900000-a3c0-11eb-81c1-bde4f0c51aa2.png" width="600" height="400">


 ### 2. 메인 페이지

 - 로그인한 유저정보를 확인해 헤더에 소속 기숙사 로고 배치
 - 기차 아이콘 클릭 시 집으로 돌아갈 수 있다. (로그아웃)
 - 기숙사 배정 기능만 활성화 되어있다.

 <img src='https://user-images.githubusercontent.com/77574867/115729697-98f25a00-a3c0-11eb-82e0-72744d288684.png' width='600' height='400'>


 ### 3. 기숙사 배정

 - 상태를 활용하여 질문 하나를 선택할때마다 top값에 변화를 주어 다음 질문으로 넘어간다.
- transition 속성을 활용해 슬라이딩 효과를 주었다.
- 기숙사 배정 로직은 각 질문의 value를 각각의 기숙사로 지정하고 가장 많이 선택한 기숙사를 배정, 가장 많이 선택한 기숙사가 둘 이상인 경우 마지막 질문인 선호하는 기숙사 질문의 영향을 받는다.

 <img src='https://user-images.githubusercontent.com/77574867/115729676-95f76980-a3c0-11eb-8c64-9fffff098f88.png' width='600' height='400'>



### 4. 소속 기숙사

- 채팅방
    - socket.io를 이용한 양방향 통신을 활용
    - 클라이언트가 접속할때마다 connected 소켓을 통해 보내는 데이터를 배열에 저장해 클라이언트에게 보내준다.
    - 클라이언트는 배열의 길이를 통해 현재 접속중인 유저의 숫자를 파악한다.
    - 연결이 끊길때는 disconnected 소켓을 통해 배열의 데이터를 하나 빼준다.
    - 추후 배열에 넣고 빼는 데이터를 nickname으로 변경해 접속한 유저정보도 추가 하면 좋을 것 같다.

- 해당 기숙사 학생 프로필
    - 현재 페이지의 기숙사 이름을 서버로 보내 해당하는 유저정보를 받아온다.
    - 카드는 css3d효과를 활용해 버튼을 클릭하면 뒤집힌다.
    - 추후 상세정보도 추가 예정
    - 해당 기숙사에 들어온 분위기를 내기 위해 기숙사마다 배경화면을 다르게 설정하였다. 

 <img src='https://user-images.githubusercontent.com/77574867/115729690-97289680-a3c0-11eb-91aa-8031383f90b1.png' width='600' height='400'>
 <img src='https://user-images.githubusercontent.com/77574867/115729694-9859c380-a3c0-11eb-8c24-4e8a4c97da52.png' width='600' height='400'>

 - 그리핀도르와 다른 래번클로의 기숙사 배경
 <img src='https://user-images.githubusercontent.com/77574867/115729653-909a1f00-a3c0-11eb-9ac5-8d23df1a3a07.png' width='600' height='400'>