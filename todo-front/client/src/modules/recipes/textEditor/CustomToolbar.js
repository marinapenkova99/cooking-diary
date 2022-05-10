import PropTypes from "prop-types";
import React from "react";

const CustomToolbar = ({ id }) => (
  <div id={id}>
    <button className="ql-header" value="1"></button>
    <button className="ql-header" value="2"></button>
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option selected />
    </select>
    <select className="ql-font" />
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-blockquote" />
    <button className="ql-indent" value="-1"></button>
    <button className="ql-indent" value="+1"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-list" value="ordered"></button>
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-clean" />
    <button className="ql-custom">Equote</button>
  </div>
);

CustomToolbar.propTypes = {
  id: PropTypes.string,
};

export default CustomToolbar;
