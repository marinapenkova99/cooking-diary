import React from "react";
import { Link } from "react-router-dom";
import "./OrangeButtonStyle.css";
const OrangeButton = ({ linkTo, onClick, text }) => {
  if (linkTo)
    return (
      <Link className="orange_button" to={linkTo}>
        {text}
      </Link>
    );
  return (
    <div className="orange_button" onClick={onClick}>
      {text}
    </div>
  );
};

export default OrangeButton;
