import React, { useEffect, useState } from "react";
import UserLayout from "../../../packages/userLayout/UserLayout";
import OrangeButton from "../../../packages/buttons/orangeButton/OrangeButton";
import axios from "axios";
import { H2, Label } from "../../../packages/text/Text";
import Input from "../../../packages/input/Input";

const EditCategoryContainer = (props) => {
  const [inputState, setInputState] = useState({
    categoryName: "",
  });
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategory();
  }, []);
  const handleInput = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let isValid = true;
    if (inputState.categoryName.length < 1) {
      isValid = false;
      setNameError("Моля, въведете валидно име.");
    }

    return isValid;
  };
  const resetForm = () => {
    setNameError("");
    setInputState({ categoryName: "" });
  };
  const getCategory = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/category/${props.match.params.id}`)
      .then((res) => {
        setInputState({ categoryName: res.data[0].name });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleSubmit = () => {
    let categoryFormValid = validateForm();

    if (!categoryFormValid) {
      return;
    }

    resetForm();
    let category = {
      name: inputState.categoryName,
    };
    axios
      .put(`http://localhost:4000/category/${props.match.params.id}`, {
        category,
      })
      .then((res) => {
        setSuccess("Вие успешно редактирахте категория");
      })
      .catch((e) => console.error(e));
  };
  if (isLoading) return null;
  return (
    <div className="page_wrapper">
      <UserLayout>
        <H2 h2={"Редактирай категория"} />
        <Label label={"Име на категория"} />{" "}
        <Input
          type={"text"}
          value={inputState.categoryName}
          name={"categoryName"}
          handleInput={handleInput}
          error={nameError}
        />
        <div className="btn_wrapper">
          <OrangeButton onClick={handleSubmit} text={"Редактирай"} />
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

export default EditCategoryContainer;
