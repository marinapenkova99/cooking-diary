import React from "react";
import UserLayout from "../../../../packages/userLayout/UserLayout";
import OrangeButton from "../../../../packages/buttons/orangeButton/OrangeButton";
import { H2, Label } from "../../../../packages/text/Text";
import Input from "../../../../packages/input/Input";

const UserProfile = ({ handleInput, success, handleSubmit, inputState }) => {
  return (
    <div className="page_wrapper">
      <UserLayout>
        <H2 h2={"Моят профил"} />
        <div className="row">
          <div className="col-6">
            <Label label={"Потребителско име"} />
            <Input
              value={inputState.username}
              handleInput={handleInput}
              type={"text"}
              name={"username"}
            />
          </div>
          <div className="col-6">
            <Label label={"Парола"} />
            <Input
              value={inputState.password}
              handleInput={handleInput}
              type={"password"}
              name={"password"}
            />
          </div>
        </div>
        <div className="btn_wrapper">
          <OrangeButton text={"Запази"} onClick={handleSubmit} />
        </div>
        {success && (
          <p style={{ textAlign: "right" }} className="success">
            {success}
          </p>
        )}
      </UserLayout>
    </div>
  );
};

export default UserProfile;
