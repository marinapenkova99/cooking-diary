import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import UserLayout from "../../../packages/userLayout/UserLayout";
import OrangeButton from "../../../packages/buttons/orangeButton/OrangeButton";
import { H2, Label } from "../../../packages/text/Text";
import Input from "../../../packages/input/Input";

const CreateCategoryContainer = (props) => {
  const [inputState, setInputState] = useState({
    categoryName: "",
  });
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState("");
  const handleInput = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    if (inputState.categoryName.length < 1) {
      isValid = false;
      setNameError("Моля, въведете валидно име на категория.");
    }

    return isValid;
  };
  const resetForm = () => {
    setNameError("");
    setInputState({ categoryName: "" });
  };
  const handleSubmit = () => {
    let categoryFormValid = validateForm();

    if (!categoryFormValid) {
      return;
    }

    resetForm();
    let category = {
      id: uuidv4(),
      name: inputState.categoryName,
    };
    axios
      .post(`http://localhost:4000/category`, { category })
      .then((res) => {
        setSuccess("Вие успешно създадохте категория");
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="page_wrapper">
      <UserLayout>
        <H2 h2={"Създай категория"} />
        <Label label={"Име на категория"} />
        <Input
          error={nameError}
          handleInput={handleInput}
          name={"categoryName"}
          value={inputState.categoryName}
          type={"text"}
        />
        <div className="btn_wrapper">
          <OrangeButton onClick={handleSubmit} text={"Създай"} />
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

export default CreateCategoryContainer;
