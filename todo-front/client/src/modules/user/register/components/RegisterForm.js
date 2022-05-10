import React from "react";
import "./RegisterFormStyle.css";
import { Link } from "react-router-dom";
import { H2, Label } from "../../../../packages/text/Text";
import Input from "../../../../packages/input/Input";

const RegisterForm = ({
  handleChange,
  username,
  password,
  handleSubmit,
  password2,
  passwordError,
  usernameError,
  email,
  emailError,
}) => {
  return (
    <div className="page_wrapper">
      <div className="form_wrapper">
        <div className="logo_wrapper">
          <img src={"/logo.svg"} alt="logo" />
        </div>
        <H2 h2={"Регистрирай се"} />
        <Label label={"Имейл"} />
        <Input
          name={"email"}
          type={"text"}
          handleInput={handleChange}
          value={email}
          error={emailError}
        />
        <Label label={"Потребителско име"} />
        <Input
          name={"username"}
          type={"text"}
          handleInput={handleChange}
          value={username}
          error={usernameError}
        />
        <Label label={"Парола"} />
        <Input
          name={"password"}
          error={passwordError}
          handleInput={handleChange}
          type={"password"}
          value={password}
        />
        <Label label={"Потвърди паролата"} />
        <Input
          name={"secondPassword"}
          type={"password"}
          value={password2}
          handleInput={handleChange}
          error={passwordError}
        />
        <button onClick={handleSubmit}>Регистрирай се</button>
        <p className="question">
          Вече имаш акаунт?<Link to={"/login"}> Влез</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
