import React from "react";
import "./TextStyle.css";
export const H2 = ({ h2 }) => {
  return <h2 className={"h2"}>{h2}</h2>;
};
export const Label = ({ label }) => {
  return <label className="label">{label}</label>;
};
export const H1 = ({ h1, className }) => {
  return <h1 className={className ? className : "h1"}>{h1}</h1>;
};
