import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import React, { useContext } from "react";
import Header from "./Header";
import Button from "./Button";
import Editor from "./Editor";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);
  console.log(params.id);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor />
    </div>
  );
};

export default Edit;
