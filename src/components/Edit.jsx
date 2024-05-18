import { useParams } from "react-router-dom";
import React from "react";

const Edit = () => {
  const params = useParams();
  return <div>{params.id}번 일기입니다.</div>;
};

export default Edit;
