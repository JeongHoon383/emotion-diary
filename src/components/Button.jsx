import React from "react";
import "./Button.css";

const Button = ({ text, type, onClick }) => {
  return (
    <div>
      <button className={`Button Button_${type}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
