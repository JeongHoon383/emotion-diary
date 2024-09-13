# 감정 일기장

* 배포 url : https://emotion-diary-git-main-jeonghoons-projects-ac9a7f3e.vercel.app/

## 프로젝트 소개
* 일기를 작성할 수 있는 서비스 입니다.
* 일기의 내용 뿐만 이미지를 통해 유저의 감정도 기록할 수 있습니다.

## 개발 기간 / 개발 인원
24.05.14 ~ 24.06.12

1명

## 개발 환경
* Front : HTML, CSS, JavaScript, React, React-context
* 버전 관리 : Github
* 배포 환경 : Vercel

## 채택한 개발 기술
### React, React Context
* React
  * 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려
  * 헤더, 버튼 등 중복되는 부분을 컴포넌트화를 통해 리소스 절약
* React Context
  * prop drilling 문제를 해결해 컴포넌트 트리 깊은 곳까지 데이터를 효율적으로 전달
  * redux가 아닌 React Context 사용 이유
    *  Redux에 비해 간단한 전역 상태 관리 용이
    *  소규모 프로젝트나 복잡하지 않은 상태를 관리할 때 더 직관적이고 간편하게 사용 가능

## 프로젝트 구조
```
├── public
│   ├── favicon.ico
│   ├── NanumPenScript-Regular.ttf
│   ├── thumbnail.png
│   └── vite.svg
├── src
│   ├── assets
│   │   ├── emotion1.png
│   │   ├── emotion2.png
│   │   ├── emotion3.png
│   │   ├── emotion4.png
│   │   ├── emotion5.png
│   │   └── react.svg
│   ├── components
│   │   ├── Button.css
│   │   ├── Button.jsx
│   │   ├── DiaryItem.css
│   │   ├── DiaryItem.jsx
│   │   ├── DiaryList.css
│   │   ├── DiaryList.jsx
│   │   ├── Editor.css
│   │   ├── Editor.jsx
│   │   ├── EmotionItem.css
│   │   ├── EmotionItem.jsx
│   │   ├── Header.css
│   │   ├── Header.jsx
│   │   ├── Viewer.css
│   │   └── Viewer.jsx
│   ├── hooks
│   │   ├── useDiary.jsx
│   │   └── usePageTitle.jsx
│   ├── pages
│   │   ├── Diary.jsx
│   │   ├── Edit.jsx
│   │   ├── Home.jsx
│   │   ├── New.jsx
│   │   └── Notfound.jsx
│   ├── util
│   │   ├── constants.js
│   │   ├── get-emotion-image.js
│   │   └── get-stringed-date.js
│   ├── App.css
│   └── App.jsx
```

## 페이지별 기능

### [초기화면]
* 서비스 접속 초기 화면으로 작성된 일기, 날짜, 내용을 볼 수 있습니다.
* 버튼 및 이미지를 클릭하면 년, 월 변경, 일기 작성, 수정 및 상세 내용을 볼 수 있습니다

![초기 화면](https://github.com/user-attachments/assets/044ce61b-b3ef-4ea1-9af8-bb561f48ed17)

### [일기 작성]
* 새 일기 쓰기 버튼을 클릭하면 일기 작성 페이지로 이동합니다.
* 일기 작성 페이지에서는 원하는 날짜, 감정을 선택할 수 있고 일기를 작성할 수 있습니다.
* 작성 완료를 클릭하면 홈 화면에 작성된 일기장이 추가됩니다. 

![일기 작성 페이지](https://github.com/user-attachments/assets/44cd3db2-f3c6-4e37-a4d8-5feb7b041bde)

### [일기 수정]
* 홈에서 수정하기를 클릭하면 일기를 수정할 수 있는 페이지가 나옵니다.
* 일기 수정페이지에서 날짜, 감정, 내용 변경 후 작성 완료를 누르면 수정이 가능하고 삭제 기능도 가능합니다.

![감정일기장 수정 페이지](https://github.com/user-attachments/assets/6289c098-1aad-4da5-a250-da80830c62ea)

### [일기 상세]
* 홈에서 일기의 이미지 또는 내용부분을 클릭하면 상세 페이지로 이동합니다.
* 상세페이지에서는 일기 날짜, 감정, 내용이 확인 가능하며 뒤로 가기와 수정하기 버튼을 통해 해당 페이지로 이동이 가능합니다.

![감정 일기장 상세 페이지](https://github.com/user-attachments/assets/41f19539-2ff9-4967-a494-fc4b8e5629bf)

## 트러블 슈팅
* [일기 수정 후 삭제 불가 이슈](https://github.com/JeongHoon383/emotion-diary/wiki/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85_%EC%9D%BC%EA%B8%B0-%EC%88%98%EC%A0%95-%ED%9B%84-%EC%82%AD%EC%A0%9C-%EB%B6%88%EA%B0%80-%EC%9D%B4%EC%8A%88#%EC%9D%BC%EA%B8%B0-%EC%88%98%EC%A0%95-%ED%9B%84-%EC%82%AD%EC%A0%9C-%EB%B6%88%EA%B0%80-%EC%9D%B4%EC%8A%88)

## 성능 개선
* 이미지 최적화
  * 이미지를 public 폴더가 아닌 src/assets 폴더에 넣어 줌으로써, 브라우저 메모리에 캐싱
  * assets 폴더에 넣어준 이미지는 요청 크기 및 시간이 최적화 됨.
  <img width="732" alt="스크린샷 2024-09-13 오후 5 41 30" src="https://github.com/user-attachments/assets/b0382c1e-30c4-4a99-a891-839c198c6a4a">

