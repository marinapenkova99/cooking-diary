import React from "react";
import { Link } from "react-router-dom";
import { H2, Label } from "../../../../packages/text/Text";
import Input from "../../../../packages/input/Input";

const LoginForm = ({ password, handleChange, handleSubmit, error, email }) => {
  return (
    <div className="page_wrapper">
      <div className="form_wrapper">
        <div className="logo_wrapper">
          <img src={"/logo.svg"} alt="logo" />
        </div>
        <H2 h2={"Влез в своя акаунт"} />
        <Label label={"Имейл"} />
        <Input
          handleInput={handleChange}
          name={"email"}
          type={"text"}
          value={email}
        />
        <Label label={"Парола"} />
        <Input
          handleInput={handleChange}
          name={"password"}
          type={"text"}
          value={password}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>Влез</button>
        <p className="question">
          Нов потребител?<Link to={"/register"}> Регистрирай се</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
