import React from "react";
import "./InputStyle.css";

const Input = ({ handleInput, name, value, error, type }) => {
  return (
    <>
      <input
        className={"input"}
        type={type}
        onChange={handleInput}
        name={name}
        value={value}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Input;
