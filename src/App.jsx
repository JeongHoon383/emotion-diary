import "./App.css";
import { useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./components/Edit";
import Notfound from "./pages/Notfound";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createData: new Date().getTime(),
    emtionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createData: new Date().getTime(),
    emtionId: 2,
    content: "2번 일기 내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };
  // 기존 일기 수정

  // 기존 일기 삭제

  return (
    // Routes 컴포넌트 안에는 Route  컴포넌트만 들어갈 수 있음 div 같은 태그요소를 넣을 수 없음
    <>
      <button
        onClick={() => {
          onCreate(new Date().getTime(), 1, "Hello ");
        }}
      >
        일기 추가 테스트
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
    // path="*" -> * - 와일드 카드, 마치 switch문에 default와 비슷하다고
    // 생각하면 됨
  );
}

export default App;
