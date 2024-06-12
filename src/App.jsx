import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

function reducer(state, action) {
  let nextState;
  // 새로운 state 값을 저장 할 변수

  switch (action.type) {
    case "INIT":
      return action.data;
    // INIT case는 다른 case 와 다르게 nextState 변수에 담지 않은 이유
    // nextState는 localStorage에 변경된 데이터의 값을 저장해주는 역할
    // but, INIT case는 action.data 의 값은 애초에 locaStorage에서 불러온 값이기 때문
    // 한번 더 불러올 필요 없음
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }

    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => item.id !== action.id);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // 만약 useEffect 가 호출되기 전 즉 dispatch 함수가 데이터 state의 일기
  // 데이터를 저장해두기 전에 다른 페이지 컴포넌트들이 미리 랜더링이 진행된다면?
  // useDiary가 먼저 진행되어 빈 배열을 반환할 수가 있음.
  // 해결 방법 : 로딩 기능을 만들어주면 됨.
  // 로딩 상태를 보관하는 state 생성
  // dispatch 함수가 실행되어서 데이터 state의 초기값을 설정하는 순간 로딩이 끝나면 됨
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    // undefined 또는 null 값이 반환됐을때 예외처리

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      // 배열이라면 false 아니라면 true -> ! not 연산 붙음
      setIsLoading(false);
      return;
    }
    // parsedData의 값이 배열이 아닌 경우 예외처리

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;
    // 새로운 일기를 추가할 때 id가 겹칠 수 있음
    // 가장 높은 Id를 찾아서 + 1 시켜줌.

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    // 새로운 일기를 추가하는 기능
    // 콜백함수 요소는 사용자로부터 받는 데이터
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
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>;
  }
  // 로딩이 끝나지 않았을 때 페이지들도 랜더링 하면 안됨
  // 로딩중일때 조건문도 추가 해줄것

  return (
    // Routes 컴포넌트 안에는 Route  컴포넌트만 들어갈 수 있음 div 같은 태그요소를 넣을 수 없음
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
    // path="*" -> * - 와일드 카드, 마치 switch문에 default와 비슷하다고
    // 생각하면 됨
  );
}

export default App;
