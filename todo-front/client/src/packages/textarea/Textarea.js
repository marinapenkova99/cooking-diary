import React from "react";
import "./TextareaStyle.css";

const Textarea = ({ handleInput, value, name, error }) => {
  return (
    <>
      <textarea
        className={"textarea"}
        rows={5}
        name={name}
        onChange={handleInput}
        value={value}
      />
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Textarea;
